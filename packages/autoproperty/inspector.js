
/// 水水水水水水水水水水水
Vue.component('test-inspector', {
  // 修改组件在 inspector 的显示样式
  template:`<template v-for="prop in target">\n
              <component\n v-if="prop.attrs.visible !== false"\n :is="prop.compType"\n :target.sync="prop"\n :indent="0"\n :multi-values="multi"\n ></component>\n
            </template>\n
            <ui-button v-on:confirm="onclicked">自动绑定</ui-button>`,

    props: {
      target: {
        twoWay: true,
        type: Object,
      },
    },

    methods: {
      onclicked: function(){
        let curNode = this.getRootNode( this.target.node.value.uuid)
        for (const key in this.target) {
          let prop = this.target[key]
          if( prop && prop.attrs.visible !== false) { 
            let _constructor = cc.js.getClassByName(prop.attrs.type)
            _constructor = _constructor? _constructor: cc.js._registeredClassIds[prop.attrs.type]
              if( _constructor) {
                if( prop.type == "Array") {
                  for( let idx=0; idx < prop.value.length; idx++){
                    if(!prop.value[idx].uuid) {
                      let value = this._getValue( curNode, `${key}${idx}`, _constructor)
                      if( value) {
                        Editor.Ipc.sendToPanel("scene", "scene:set-property", {
                          id: this.target.uuid.value,// curComponent.uuid,
                          path: `${key}.${idx}`,
                          type: prop.attrs.type,
                          value: { uuid: value.uuid, name: value.name},
                          isSubProp: false
                        })
                      }
                    }
                  }
                } else if(!prop.value.uuid) {
                  let value = this._getValue( curNode, key, _constructor)
                  if( value) {
                    Editor.Ipc.sendToPanel("scene", "scene:set-property", {
                      id: this.target.uuid.value,// curComponent.uuid,
                      path: key,
                      type: prop.attrs.type,
                      value: { uuid: value.uuid, name: value.name},
                      isSubProp: false
                    })
                  }
              }
            }
          }
        }
      },

      _getValue( node, name, _constructor) {
        if( _constructor == cc.Node){
          return this._getChildren( node, name)
        }
        if( cc.js.isChildClassOf( _constructor, cc.Component)){
          return this._getChildrenByComponent( node, name, _constructor)
        }
      },

      /// 获取子节点
      _getChildren(  root, name){
        let _getChild = ( _root)=>{ //"Editor Scene Background"
            let child = _root.name == name? _root: _root.getChildByName( name)
            if( child)
                return child
            for( let idx=0; idx < _root.childrenCount; idx++){
                child = _getChild( _root._children[idx])
                if( child != null) { break}
            }
            return child
        }
        return _getChild( root)
      },

      /// 获取子节点的component
      _getChildrenByComponent( root, name, comp){
        let _getChild = ( _root)=>{
            console.log( "root:", _root.name, _root.name == name)
            let child = _root.name == name? _root: _root.getChildByName( name)
            let component = child? child.getComponent( comp): null
            if( component) { return component }
            for( let idx=0; idx < _root.childrenCount; idx++){
                component = _getChild( _root._children[idx])
                if( component != null) { break}
            }
            return component
        }
        return _getChild( root)
      },

      /// huo
      getRootNode( uuid) {
        let _getChild = ( root)=>{
            if( root.uuid == uuid)
                return root
            let child = null
            for( let idx=0; idx < root.childrenCount; idx++){
                let temp = root._children[idx]
                if( temp.name == "Editor Scene Background" || temp.name == "Editor Scene Foreground"){
                  continue
                }
                child = _getChild( temp)
                if( child != null) { break}
            }
            return child
        }
        return _getChild( cc.director.getScene())
      },
    },

});