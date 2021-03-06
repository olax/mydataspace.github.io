UILayout.popups.newRoot = {
	view: 'popup',
	id: 'entity_tree__new_root_popup',
  css: 'admin_context_menu entity_tree__new_root_popup',
	width: 150,
	body: {
		view: 'list',
    id: 'entity_tree__new_root_list',
    class: 'entity_tree__new_root_list',
    borderless: true,
		data: [
      { id: 'new_root', value: STRINGS.new_empty_root },
      { id: 'import_wizard', value: STRINGS.import_root }
//      { id: 'import_csv', value: 'Import Root from CSV As Is' }
		],
		datatype: 'json',
//		template: '<i class="fa fa-#icon#" style="width: 28px;"></i> #value#',
		autoheight: true,
		select: true,
    on: {
      onItemClick: function(newv) {
        switch (newv) {
          case 'new_root':
            $$('add_root_window').show();
            break;
          case 'import_wizard':
            $('#import_data_modal').modal('show');
            break;
          case 'import_csv':
            break;
        }
        $$('entity_tree__new_root_popup').hide();
      }
    }
	}
};
