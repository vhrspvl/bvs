frappe.pages['bvs-entry-selection'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'BVS Entry Selection',
		single_column: true
	});

	console.log(page)
	$(frappe.render_template("bvs_entry_selection")).appendTo(page.body.addClass("no-border"));
}