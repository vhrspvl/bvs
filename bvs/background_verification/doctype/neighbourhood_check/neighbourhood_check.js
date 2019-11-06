// Copyright (c) 2019, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Neighbourhood Check', {
    refresh: function (frm) {
        if (frm.doc.status == "Select") {
            frappe.msgprint(__("Please select the status"));
        }
    },
    after_save: function (frm) {
        if (frm.doc.checks_group) {
            if (frm.doc.status == "IQC Completed") {
                frappe.call({
                    "method": "bvs.background_verification.doctype.applicant.applicant.get_checks_group",
                    args: {
                        "applicant": frm.doc.applicant_id,
                        "checks_group": frm.doc.checks_group,
                        "doctype": doctype.name,
                        "check_status": frm.doc.status
                    },
                    callback: function (r) {
                        if (r.message.doctype) {
                            if (r.message.status != frm.doc.status) {
                                frappe.set_route('Form', r.message.doctype, r.message.name);
                            }
                        } else if (r.message != "Completed") {
                            frappe.set_route('Form', r.message, 'New ' + r.message, { "tat": frm.doc.tat, "applicant_name": frm.doc.applicant_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.applicant_id });
                        } else if (r.message == "Completed") {
                            frappe.set_route('Form', "Applicant", frm.doc.applicant_id);
                        }
                    }
                })
            } else {
                frappe.confirm(
                    'Do you want to attach the File?',
                    function () {
                        window.close();
                    },
                    function () {
                        frappe.call({
                            "method": "bvs.background_verification.doctype.applicant.applicant.get_checks_group",
                            args: {
                                "applicant": frm.doc.applicant_id,
                                "checks_group": frm.doc.checks_group,
                                "doctype": doctype.name,
                                "check_status": frm.doc.status
                            },
                            callback: function (r) {
                                if (r.message.doctype) {
                                    if (r.message.status != frm.doc.status) {
                                        frappe.set_route('Form', r.message.doctype, r.message.name);
                                    }
                                } else if (r.message != "Completed") {
                                    frappe.set_route('Form', r.message, 'New ' + r.message, { "tat": frm.doc.tat, "applicant_name": frm.doc.applicant_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.applicant_id });
                                } else if (r.message == "Completed") {
                                    frappe.set_route('Form', "Applicant", frm.doc.applicant_id);
                                }
                            }
                        })
                    }
                )
            }
        }
        if (frm.doc.tat) {
            frm.set_df_property('tat', 'read_only', 1);
        }

    },
    refresh: function (frm) {
        if (frm.doc.allocated_for) {
            $(cur_frm.fields_dict.allocated_for.input).css("backgroundColor", "DeepPink");
        }
        frm.add_custom_button(__('Back'), function () {
            frappe.set_route("Form", "Applicant", frm.doc.applicant_id)
        });
    },
    validate: function (frm) {
        if (frm.doc.allocated_for != frm.doc.status) {
            frm.set_value("executive", "");
        }
        if (frm.doc.allocated_for == "IQC Pending") {
            frm.set_value("status", "IQC Completed")
        }
        if (frm.doc.allocated_for == "Allocation Pending") {
            frm.set_value("status", "Allocation Completed")
        }
        if (frm.doc.allocated_for == "Entry Pending") {
            if (frm.doc.status == "Insufficient") {
                frm.set_value("status", "Insufficient")
            } else {
                frm.set_value("status", "Entry Completed")
            }
        }

    },
    // address_same_as: function (frm) {
    //     if (frm.doc.address_same_as === "Present Address") {
    //         frappe.call({
    //             "method": "frappe.client.get",
    //             args: {
    //                 doctype: "Applicant",
    //                 name: frm.doc.applicant_id
    //             },
    //             callback: function (r) {
    //                 frm.set_value("address_line1", r.message.address_line1);
    //                 frm.set_value("address_line2", r.message.address_line2);
    //                 frm.set_value("address_line3", r.message.address_line3);
    //                 frm.set_value("talukdistrict", r.message.talukdistrict);
    //                 frm.set_value("state", r.message.state);
    //                 frm.set_value("city", r.message.city);
    //                 frm.set_value("country", r.message.country);
    //                 frm.set_value("pincode", r.message.pincode);
    //             }

    //         })
    //     } else {
    //         frm.set_value("address_line1", "");
    //         frm.set_value("address_line2", "");
    //         frm.set_value("address_line3", "");
    //         frm.set_value("talukdistrict", "");
    //         frm.set_value("state", "");
    //         frm.set_value("city", "");
    //         frm.set_value("country", "");
    //         frm.set_value("pincode", "");
    //     }
    // },
    address_same_as2: function (frm) {
        if (frm.doc.address_same_as2 === "Present Address") {
            frappe.call({
                "method": "frappe.client.get",
                args: {
                    doctype: "Applicant",
                    name: frm.doc.applicant_id
                },
                callback: function (r) {
                    if (r.message.address_line2 == null) {
                        frm.set_value("reference_address", r.message.address_line1 + ",\n" + r.message.talukdistrict + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.address_line2 == null && r.message.talukdistrict != null) {
                        frm.set_value("reference_address", r.message.address_line1 + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.address_line3 == null && r.message.talukdistrict == null) {
                        frm.set_value("reference_address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.talukdistrict == null) {
                        frm.set_value("reference_address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.address_line3 + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.city == null) {
                        frm.set_value("reference_address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.address_line3 + ",\n" + r.message.talukdistrict + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.city == null && r.address_line3 == null) {
                        frm.set_value("reference_address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.talukdistrict + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else {
                        frm.set_value("reference_address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.address_line3 + ",\n" + r.message.talukdistrict + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    }
                }

            })
        } else {
            frm.set_value("reference_address", "");
        }
    },
    address_same_as: function (frm) {
        if (frm.doc.address_same_as === "Present Address") {
            frappe.call({
                "method": "frappe.client.get",
                args: {
                    doctype: "Applicant",
                    name: frm.doc.applicant_id
                },
                callback: function (r) {
                    if (r.message.address_line2 == null) {
                        frm.set_value("address", r.message.address_line1 + ",\n" + r.message.talukdistrict + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.address_line2 == null && r.message.talukdistrict != null) {
                        frm.set_value("address", r.message.address_line1 + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.address_line3 == null && r.message.talukdistrict == null) {
                        frm.set_value("address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.talukdistrict == null) {
                        frm.set_value("address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.address_line3 + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.city == null) {
                        frm.set_value("address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.address_line3 + ",\n" + r.message.talukdistrict + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else if (r.message.city == null && r.address_line3 == null) {
                        frm.set_value("address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.talukdistrict + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    } else {
                        frm.set_value("address", r.message.address_line1 + ",\n" + r.message.address_line2 + ",\n" + r.message.address_line3 + ",\n" + r.message.talukdistrict + ",\n" + r.message.city + ",\n" + r.message.state + ",\n" + r.message.country + ",\n" + r.message.pincode);
                    }
                }

            })
        } else {
            frm.set_value("address", "");
        }
    },
});
