// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Profile', {
    refresh: function (frm) {
        frm.set_query("checks_group", function () {
            return {
                query: "bvs.utils.get_groups",
                filters: {
                    customer: frm.doc.customer
                }
            };
        });
    },
    onload: function (frm) {
        frm.toggle_display(['employment', 'second_employment', 'third_employment', 'education', 'second_education', 'third_education', 'family_history', 'address_check', 'court_record',
            'criminal_check', 'reference_check', 'professional_reference', 'personal_reference', 'identity', 'pan_number_detail', 'aadhar_card_detail', 'voter_card_detail',
            'passport_details']);
    },
    checks_group: function (frm) {
        // var checks = frappe.get_doc("Checks Group", frm.doc.checks_group)
        if (frm.doc.checks_group) {
            frappe.call({
                method: "bvs.utils.get_group_checks",
                args: {
                    "checks_group": frm.doc.checks_group
                },
                callback: function (r) {
                    (r.message || []).forEach(function (d) {
                        if (d === "employment1") {
                            frm.toggle_display('employment', d === "employment1");
                        }
                        if (d === "employment2") {
                            frm.toggle_display('second_employment', d === "employment2");
                        }
                        if (d === "employment3") {
                            frm.toggle_display('third_employment', d === "employment3");
                        }
                        if (d === "education1") {
                            frm.toggle_display('education', d === "education1");
                        }
                        if (d === "education2") {
                            frm.toggle_display('second_education', d === "education2");
                        }
                        if (d === "education3") {
                            frm.toggle_display('third_education', d === "education3");
                        }
                        if (d === "reference1") {
                            frm.toggle_display('reference_check', d === "reference1");
                        }
                        if (d === "reference2") {
                            frm.toggle_display('professional_reference', d === "reference2");
                        }
                        if (d === "reference3") {
                            frm.toggle_display('personal_reference', d === "reference3");
                        }
                        if (d === "aadhar") {
                            frm.toggle_display('aadhar_card_detail', d === "aadhar");
                        }
                        if (d === "driving") {
                            frm.toggle_display('identity', d === "driving");
                        }
                        if (d === "voter") {
                            frm.toggle_display('voter_card_detail', d === "voter");
                        }
                        if (d === "pan") {
                            frm.toggle_display('pan_number_detail', d === "pan");
                        }
                        if (d === "passport") {
                            frm.toggle_display('passport_details', d === "passport");
                        }
                        if (d === "family") {
                            frm.toggle_display('family_history', d === "family");
                        }
                        if (d === "criminal") {
                            frm.toggle_display('criminal_check', d === "criminal");
                        }
                        if (d === "court") {
                            frm.toggle_display('court_record', d === "court");
                        }
                        if (d === "address") {
                            frm.toggle_display('address_check', d === "address");
                        }


                    });

                }
            });
        }
    },
});
