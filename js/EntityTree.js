function EntityTree() {

}

EntityTree.prototype.getCurrentId = function() {
  return this.currentId;
};

EntityTree.prototype.setCurrentId = function(id) {
  this.currentId = id;
};

EntityTree.prototype.resolveChildren = function(id) {
  return new Promise(function(resolve, reject) {
    var firstChildId = $$('entity_tree').getFirstChildId(id);
    if (firstChildId != null && firstChildId !== UIHelper.childId(id, UIHelper.ENTITY_TREE_DUMMY_ID)) {
      resolve();
      return;
    }
    // Load children to first time opened node.
    Mydataspace.request('entities.getChildren', UIHelper.dataFromId(id), function(data) {
      var entityId = UIHelper.idFromData(data);
      var children = data.children.map(UIHelper.entityFromData);
      UI.entityTree.setChildren(entityId, children);
      resolve();
    }, function(err) {
      reject(err);
    });
  });
};

EntityTree.prototype.setCurrentIdToFirst = function() {
  var firstId = $$('entity_tree').getFirstId();
  this.setCurrentId(firstId);
  return firstId;
};

EntityTree.prototype.onCreate = function(data) {
  var parentId = UIHelper.parentId(UIHelper.idFromData(data));
  var entity = UIHelper.entityFromData(data);
  if (parentId === 'root') {
    $$('entity_tree').add(entity, 0);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }
    $$('entity_tree').select(entity.id);
  } else if (!common.isNull($$('entity_tree').getItem(parentId)) &&
    common.isNull($$('entity_tree').getItem(UIHelper.childId(parentId, UIHelper.ENTITY_TREE_DUMMY_ID)))) {
    $$('entity_tree').add(entity, 0, parentId);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }

    this.resolveChildren(parentId).then(function() {
      $$('entity_tree').open(entity.id);
    });

  }
};

EntityTree.prototype.listen = function() {
  Mydataspace.on('entities.delete.res', function(data) {
    var entityId = UIHelper.idFromData(data);

    if ($$('entity_tree').getItem(entityId) == null) {
      return;
    }

    if (entityId === this.getCurrentId()) { // Select other item if selected item is deleted.
      let nextId = $$('entity_tree').getPrevSiblingId(entityId) || $$('entity_tree').getNextSiblingId(entityId) || $$('entity_tree').getParentId(entityId);
      $$('entity_tree').select(nextId);
    }

    $$('entity_tree').remove(entityId);
  }.bind(this));

  Mydataspace.on('entities.create.res', this.onCreate.bind(this));
};

EntityTree.prototype.refresh = function() {
  $$('entity_tree').disable();
  if (UI.isViewOnly()) {
    Mydataspace.request('entities.get', { root: UI.getViewOnlyRoot(), path: '' }, function(data) {
      $$('entity_tree').clearAll();
      // convert received data to treeview format and load its to entity_tree.
      var formattedData = UIHelper.entityFromData(data);
      $$('entity_tree').parse([formattedData]);
      $$('entity_tree').enable();
    }, function(err) {
      UI.error(err);
      $$('entity_tree').enable();
    });
  } else {
    Mydataspace.request('entities.getMyRoots', {}, function(data) {
      $$('entity_tree').clearAll();
      // convert received data to treeview format and load its to entity_tree.
      var formattedData = data['roots'].map(UIHelper.entityFromData);
      $$('entity_tree').parse(formattedData);
      $$('entity_tree').enable();
    }, function(err) {
      UI.error(err);
      $$('entity_tree').enable();
    });
  }
};

/**
 * Override entity's children of nodes recursively.
 */
EntityTree.prototype.setChildren = function(entityId, children) {
  var dummyChildId = UIHelper.childId(entityId, UIHelper.ENTITY_TREE_DUMMY_ID);
  var showMoreChildId = UIHelper.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID);
  var firstChildId = $$('entity_tree').getFirstChildId(entityId);
  if (firstChildId != null && firstChildId !== dummyChildId) {
    return;
  }
  if (children.length === UIHelper.NUMBER_OF_ENTITIES_LOADED_AT_TIME) {
    children[children.length - 1] = {
      id: UIHelper.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID),
      value: STRINGS.SHOW_MORE
    }
  }
  children.reverse().forEach(function(entity) {
    $$('entity_tree').add(entity, 0, entityId);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }
  }.bind(this));
  if (firstChildId !== null) {
    $$('entity_tree').remove(firstChildId);
  }
  $$('entity_tree').addCss(showMoreChildId, 'entity_tree__show_more_item');
};

EntityTree.prototype.addChildren = function(entityId, children) {
  var showMoreChildId = UIHelper.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID);
  if (!$$('entity_tree').exists(showMoreChildId)) {
    return;
  }
  var offset;
  if (children.length === UIHelper.NUMBER_OF_ENTITIES_LOADED_AT_TIME) {
    delete children[children.length - 1];
    offset = 1;
  } else {
    $$('entity_tree').remove(showMoreChildId);
    offset = 0;
  }
  children.forEach(function(entity) {
    var nChildren = this.numberOfChildren(entityId);
    $$('entity_tree').add(entity, nChildren - offset, entityId);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }
  }.bind(this));
};

EntityTree.prototype.showMore = function(id) {
  var req = UIHelper.dataFromId(id);
  req.offset = this.numberOfChildren(id);
  Mydataspace.request('entities.getChildren', req, function(data) {
    var entityId = UIHelper.idFromData(data);
    var children = data.children.map(UIHelper.entityFromData);
    this.addChildren(entityId, children);
  }.bind(this));
};

EntityTree.prototype.numberOfChildren = function(id) {
  var n = 0;
  var prevChildId = null;
  var childId = $$('entity_tree').getFirstChildId(id);
  while (childId != null && prevChildId !== childId) {
    n++;
    prevChildId = childId;
    childId = $$('entity_tree').getNextSiblingId(childId);
  }
  return n;
};

EntityTree.prototype.lastChildId = function(id) {
  var prevChildId = null;
  var childId = $$('entity_tree').getFirstChildId(id);
  while (childId != null && prevChildId !== childId) {
    prevChildId = childId;
    childId = $$('entity_tree').getNextSiblingId(childId);
  }
  return prevChildId;
};
