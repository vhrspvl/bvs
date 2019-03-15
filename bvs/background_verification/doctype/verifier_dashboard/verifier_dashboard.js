// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Verifier Dashboard', {
    onload: function (frm) {
        frappe.call({
            "method": "bvs.background_verification.doctype.verifier_dashboard.verifier_dashboard.get_checks",
            args: {
            },
            callback: function (r) {
                if (r.message) {
                    var b = Object.keys(r.message).length;
                    console.log(b)
                    for (var i = 0; i < b; i++) {
                        var c = Object.keys(r.message[i]).length;
                        if (c != 0) {
                            var row = frappe.model.add_child(frm.doc, "Verify Dashboard List", "verify_dashboard_list");
                            row.pending_checks = c;
                            // if(pending_checks != 0){
                            // 	$(grid_row.row[i]).css({"font-weight": "bold"});
                            //     // $(cur_frm.fields_dict.pending_checks.input).css("font-color","Red");	
                            // }
                            row.executive = frappe.session.user;
                            if (i == 0) {
                                row.checks = "Verify Employment Check1";
                            }
                            if (i == 1) {
                                row.checks = "Verify Employment Check2";
                            }
                            if (i == 2) {
                                row.checks = "Verify Employment Check3";
                            }
                            if (i == 3) {
                                row.checks = "Verify Employment Check4";
                            }
                            if (i == 4) {
                                row.checks = "Verify Education Check1";
                            }
                            if (i == 5) {
                                row.checks = "Verify Education Check2";
                            }
                            if (i == 6) {
                                row.checks = "Verify Education Check3";
                            }
                            if (i == 7) {
                                row.checks = "Verify Education Check4";
                            }
                            if (i == 8) {
                                row.checks = "Verify Address Check1";
                            }
                            if (i == 9) {
                                row.checks = "Verify Address Check2";
                            }
                            if (i == 10) {
                                row.checks = "Verify Address Check3";
                            }
                            if (i == 11) {
                                row.checks = "Verify Address Check4";
                            }
                            if (i == 12) {
                                row.checks = "Verify Family Check1";
                            }
                            if (i == 13) {
                                row.checks = "Verify Family Check2";
                            }
                            if (i == 14) {
                                row.checks = "Verify Family Check3";
                            }
                            if (i == 15) {
                                row.checks = "Verify Family Check4";
                            }
                            if (i == 16) {
                                row.checks = "Verify Reference Check1";
                            }
                            if (i == 17) {
                                row.checks = "Verify Reference Check2";
                            }
                            if (i == 18) {
                                row.checks = "Verify Reference Check3";
                            }
                            if (i == 19) {
                                row.checks = "Verify Reference Check4";
                            }
                            if (i == 20) {
                                row.checks = "Verify Civil Check";
                            }
                            if (i == 21) {
                                row.checks = "Verify Criminal Check";
                            }
                            if (i == 22) {
                                row.checks = "Verify ID Check1";
                            }
                            if (i == 23) {
                                row.checks = "Verify ID Check2";
                            }
                            if (i == 24) {
                                row.checks = "Verify ID Check3";
                            }
                            if (i == 25) {
                                row.checks = "Verify ID Check4";
                            }
                            if (i == 26) {
                                row.checks = "Verify ID Check5";
                            }
                            if (i == 27) {
                                row.checks = "Verify ID Check6";
                            }
                        }
                    }
                    refresh_field("verify_dashboard_list");
                }

            }
        })
    },
    refresh: function (frm) {
        frm.disable_save();
    },
    'onload_post_render': function (frm, cdt, cdn) {
        var list = frm.doc.verify_dashboard_list;
        frm.fields_dict.verify_dashboard_list.grid.wrapper.on('focus', 'input[data-fieldname="pending_checks"][data-doctype="Verify Dashboard List"]', function (e) {
            var current_doc = $('.data-row.editable-row').parent().attr("data-name");
            var d = locals["Verify Dashboard List"][current_doc];
            if (d.pending_checks != 0) {
                frappe.set_route('List', d.checks, { "executive": frappe.session.user, "status": "Allocation Completed" });
            }
        })
    }
});