var status;
frappe.ui.form.on("Applicant", {
    after_save: function (frm) {
        if (frm.doc.id_check) {
            setTimeout(function () { location.reload() }, 500);
        }
        if (frappe.user.has_role("BVS DEO") && (frm.doc.ref_id) && (frm.doc.status == "IQC Pending")) {
            if ((status != frm.doc.status) || (frm.doc.status == "Entry Pending")) {
                frappe.set_route("Form", "Entry Dashboard");
            }
        }
        if ((frappe.user.has_role("BVS Verifier") || frappe.user.has_role("BVS Manager")) && (frm.doc.ref_id) && ((frm.doc.status == "Allocation Pending") || (frm.doc.status == "Positive") || (frm.doc.status == "Negative") || (frm.doc.status == "Amber"))) {
            frappe.confirm(
                'Do you want to Print the File?',
                function () {
                    window.close();
                },
                function () {
                    frappe.set_route("Form", "QC Verification")
                }
            )
        }
    },
    validate: function (frm) {
        if (frm.doc.ref_id_status != "Updated") {
            frm.set_value("ref_id_status", "Updated");
        } else {
            frm.set_value("ref_id", frm.doc.name);
        }
        if (frm.doc.status == "Entry Pending") {
            frm.set_value("assigned_date", frappe.datetime.nowdate())
        }
        if (frm.doc.status == "QC  Pending") {
            $(cur_frm.fields_dict.status.input).css("backgroundColor", "Chocolate");
        }
        if (frm.doc.status == "Entry Pending") {
            $(cur_frm.fields_dict.status.input).css("backgroundColor", "Aquamarine");
        }
        if (frm.doc.status == "IQC Pending") {
            $(cur_frm.fields_dict.status.input).css("backgroundColor", "DeepSkyBlue");
        }
        if (frm.doc.status == "Allocation Pending") {
            $(cur_frm.fields_dict.status.input).css("backgroundColor", "Fuchsia");
        }
        if (frm.doc.status == "QC Pending") {
            $(cur_frm.fields_dict.status.input).css("backgroundColor", "YellowGreen");
        }
        if (frm.doc.tat_stop_date) {
            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
        }
        if (frm.doc.status) {
            frm.trigger("check_status");
        }
        if (frm.doc.status) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_status",
                args: {
                    "applicant": frm.doc.name,
                    "checks_group": frm.doc.checks_group
                },
                callback: function (r) {
                    if (r.message) {
                        if (frm.doc.status == "Entry Pending" && r.message == "IQC Pending") {
                            frm.set_value("entry_completed_date", frappe.datetime.nowdate())
                            frm.set_value("entry_completed_executive", frm.doc.executive);
                            frm.set_value("executive", "");
                        }
                        if (frm.doc.status == "IQC Pending" && r.message == "Allocation Pending") {
                            frm.set_value("iqc_completed_date", frappe.datetime.nowdate())
                            frm.set_value("iqc_completed_executive", frm.doc.executive);
                            frm.set_value("executive", "");
                        }
                        if (frm.doc.status == "Allocation Pending" && r.message == "QC Pending") {
                            frm.set_value("allocation_completed_date", frappe.datetime.nowdate())
                            frm.set_value("execution_completed_executive", frm.doc.executive);
                            frm.set_value("executive", "");
                        }
                        if (frm.doc.status == "QC Pending" && r.message == "QC Completed") {
                            frm.set_value("qc_completed_date", frappe.datetime.nowdate())
                            frm.set_value("qc_completed_executive", frm.doc.executive);
                            // frm.set_value("executive", "");
                        }
                        if (frm.doc.status != r.message) {
                            frm.set_value("status", r.message);
                            frm.set_value("allocated_for", "");
                            frm.set_value("assigned_date", "");
                            frm.set_value("executive", "");
                        }
                    }
                    if (frm.doc.status == "Positive") {
                        $(cur_frm.fields_dict.status.input).css("backgroundColor", "Green");
                    }
                    if (frm.doc.status == "Negative") {
                        $(cur_frm.fields_dict.status.input).css("backgroundColor", "Red");
                    }
                    if (frm.doc.status == "Amber") {
                        $(cur_frm.fields_dict.status.input).css("backgroundColor", "Yellow");
                    }
                    if (frm.doc.status == "Insufficient") {
                        $(cur_frm.fields_dict.status.input).css("backgroundColor", "Orange");
                    }
                }
            });
        }
        if (frm.doc.modified_actual_end_date == "TAT Resumed") {
            if (frm.doc.status != "Insufficient") {
                frm.set_value("tat_resume_date", frappe.datetime.nowdate());
                $(cur_frm.fields_dict.tat_resume_date.input).css("borderColor", "Maroon");
            }
        }
        if ((frm.doc.status == "Positive") || (frm.doc.status == "Negative") || (frm.doc.status == "Amber")) {
            frm.set_value("end_date", (frappe.datetime.nowdate()))
        }
        if (frm.doc.checks_group) {
            frappe.call({
                "method": "frappe.client.get",
                args: {
                    "doctype": "Checks Group",
                    "name": frm.doc.checks_group
                },
                callback: function (r) {
                    if (r.message.name == frm.doc.checks_group) {
                        frm.set_value("tat", r.message.tat);
                        if (frm.doc.tat) {
                            var tomorrow = moment(frm.doc.in_date).add(frm.doc.tat, 'days');
                            frm.set_value("actual_end_date", tomorrow);
                            if (frm.doc.actual_end_date.get > frappe.datetime.nowdate()) {
                                $(cur_frm.fields_dict.actual_end_date.input).css("borderColor", "Blue");
                            } else if (frm.doc.actual_end_date.get = frappe.datetime.nowdate()) {
                                $(cur_frm.fields_dict.actual_end_date.input).css("borderColor", "Blue");
                                frappe.msgprint("Today is TAT End Day")
                            } else {
                                $(cur_frm.fields_dict.actual_end_date.input).css("borderColor", "Red");
                            }
                        }
                        if ((r.message.business_days) && (frm.doc.actual_end_date)) {
                            frappe.call({
                                "method": "frappe.client.get",
                                args: {
                                    doctype: "Holiday List",
                                    name: "VHRS Common Leaves"
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        var holidays = r.message.holidays;
                                        var list = r.message.holidays.length;
                                        var holiday = []
                                        for (var i = 0; i < list; i++) {
                                            holiday.push(holidays[i].holiday_date)
                                        }
                                        frappe.call({
                                            "method": "bvs.background_verification.doctype.applicant.applicant.daterange",
                                            args: {
                                                start_date: frm.doc.in_date,
                                                end_date: frm.doc.actual_end_date,
                                                holiday: holiday
                                            },
                                            callback: function (r) {
                                                if (r.message) {
                                                    var betdate = r.message.length;
                                                    dates = []
                                                    for (var i = 0; i < betdate; i++) {
                                                        dates.push(r.message[i])
                                                    }
                                                    sunday = []
                                                    dates.forEach((e1) => holiday.forEach((e2) => {
                                                        if (e1 === e2) {
                                                            sunday.push(e1)
                                                        }
                                                    }
                                                    ))
                                                    var holiday_list = sunday.length;
                                                    if (holiday_list != 0) {
                                                        var new_actual_end_date = moment(frm.doc.actual_end_date).add(holiday_list, 'days');
                                                        frm.set_value("actual_end_date", new_actual_end_date)
                                                    }
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
            })
        }
        if ((frm.doc.data_entry_allocation_id) && (frm.doc.decrease_pending_case != "Updated")) {
            if (frm.doc.ref_id_status) {
                frappe.call({
                    "method": "bvs.background_verification.doctype.entry_dashboard.entry_dashboard.get_pending_cases",
                    args: {
                        "name": frm.doc.data_entry_allocation_id
                    },
                    callback: function (r) {
                        if (r.message) {
                            frm.set_value("decrease_pending_case", "Updated")
                        }
                    }
                })
            }
        }
        if (!frm.doc.in_date) {
            frappe.call({
                "method": "frappe.client.get",
                args: {
                    "doctype": "Data Entry Allocation",
                    fieldname: "name",
                    filters: { "customer": frm.doc.customer, "executive": frm.doc.executive }
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.call({
                            "method": "frappe.client.get",
                            args: {
                                doctype: "Data Entry Allocation",
                                name: r.message.name
                            },
                            callback: function (r) {
                                if (r.message) {
                                    frm.set_value("in_date", r.message.in_date);
                                    frm.set_value("in_time", r.message.time);
                                }
                            }
                        })
                    }
                }
            })
        }
        if (frm.doc.demographic_id) {
            frappe.call({
                "method": "bvs.background_verification.doctype.demographic_data_with_attachment.demographic_data_with_attachment.update_ref_id",
                args: {
                    "ref_id": frm.doc.ref_id,
                    "demographic_id": frm.doc.demographic_id
                },
                callback: function (r) {
                }
            })
        }
        if ((frm.doc.tat_stop_date) && (frm.doc.tat_resume_date)) {
            var date_diff = frappe.datetime.get_diff(frm.doc.tat_resume_date, frm.doc.tat_stop_date)
            var new_actual_end_date = moment(frm.doc.actual_end_date).add(date_diff, 'days');
            frm.set_value("actual_end_date", new_actual_end_date)
        }
        if (frm.doc.status == "Insufficient") {
            frm.set_value("modified_actual_end_date", "TAT Resumed")
        }
        if (frm.doc.actual_end_date) {

        }

    },
    refresh: function (frm) {
        if (frm.doc.status) {
            frm.trigger("check_status");
            if (frm.doc.status == "QC  Pending") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "Chocolate");
            }
            if (frm.doc.status == "Entry Pending") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "Aquamarine");
            }
            if (frm.doc.status == "IQC Pending") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "DeepSkyBlue");
            }
            if (frm.doc.status == "Allocation Pending") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "Fuchsia");
            }
            if (frm.doc.status == "QC Pending") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "YellowGreen");
            }
            if (frm.doc.status == "Positive") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "Green");
            }
            if (frm.doc.status == "Negative") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "Red");
            }
            if (frm.doc.status == "Amber") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "Yellow");
            }
            if (frm.doc.status == "Insufficient") {
                $(cur_frm.fields_dict.status.input).css("backgroundColor", "Orange");
            }
        }
        if (frm.doc.customer && frm.doc.satus == "Entry Pending" && (frappe.user.has_role("BVS DEO") || frappe.user.has_role("BVS Manager"))) {
            frm.set_value("executive", frappe.session.user);
        }
        if (frm.doc.checks_group) {
            frappe.call({
                "method": "frappe.client.get",
                args: {
                    doctype: "Checks Group",
                    name: frm.doc.checks_group
                },
                callback: function (r) {
                    if (r.message) {
                        if (r.message.employment_check1) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.employment_check1.employment_check1.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.employment_check1.employment_check1.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.employment_check1.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.employment_check2) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.employment_check2.employment_check2.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.employment_check2.employment_check2.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.employment_check2.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.employment_check3) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.employment_check3.employment_check3.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.employment_check3.employment_check3.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.employment_check3.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.employment_check4) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.employment_check4.employment_check4.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.employment_check4.employment_check4.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.employment_check4.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.education_check1) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.education_check1.education_check1.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.education_check1.education_check1.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.education_check1.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.education_check2) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.education_check2.education_check2.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.education_check2.education_check2.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.education_check2.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.education_check3) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.education_check3.education_check3.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.education_check3.education_check3.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.education_check3.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.education_check4) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.education_check4.education_check4.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.education_check4.education_check4.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.education_check4.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.address_check1) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.address_check1.address_check1.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.address_check1.address_check1.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.address_check1.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.address_check2) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.address_check2.address_check2.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.address_check2.address_check2.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.address_check2.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.address_check3) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.address_check3.address_check3.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.address_check3.address_check3.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.address_check3.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.address_check4) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.address_check4.address_check4.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.address_check4.address_check4.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.address_check4.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.family_check1) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.family_check1.family_check1.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.family_check1.family_check1.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.family_check1.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.family_check2) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.family_check2.family_check2.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.family_check2.family_check2.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.family_check2.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.family_check3) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.family_check3.family_check3.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.family_check3.family_check3.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.family_check3.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.family_check4) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.family_check4.family_check4.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.family_check4.family_check4.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.family_check4.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.reference_check1) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.reference_check1.reference_check1.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.reference_check1.reference_check1.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.reference_check1.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.reference_check2) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.reference_check2.reference_check2.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.reference_check2.reference_check2.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.reference_check2.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.reference_check3) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.reference_check3.reference_check3.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.reference_check3.reference_check3.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.reference_check3.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.reference_check4) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.reference_check4.reference_check4.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.reference_check4.reference_check4.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.reference_check4.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.civil_check) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.civil_check.civil_check.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.civil_check.civil_check.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.civil_check.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.criminal_check) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.criminal_check.criminal_check.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.criminal_check.criminal_check.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.criminal_check.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.id_check1) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.id_check1.id_check1.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.id_check1.id_check1.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.id_check2) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.id_check2.id_check2.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.id_check2.id_check2.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.id_check2.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.id_check3) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.id_check3.id_check3.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.id_check1.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.id_check3.id_check3.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.id_check3.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.id_check4) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.id_check4.id_check4.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.id_check4.id_check4.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.id_check4.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.id_check5) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.id_check5.id_check5.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.id_check5.id_check5.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.id_check5.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }
                        if (r.message.id_check6) {
                            frappe.call({
                                "method": "bvs.background_verification.doctype.id_check6.id_check6.get_status",
                                args: {
                                    "applicant_id": frm.doc.name
                                },
                                callback: function (r) {
                                    if (r.message) {
                                        if (r.message == "Allocation Completed") {
                                            $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Chocolate");
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.id_check6.id_check6.get_vstatus",
                                                args: {
                                                    "applicant_id": frm.doc.name
                                                },
                                                callback: function (r) {
                                                    if (r.message == "Positive") {
                                                        $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Green");
                                                    }
                                                    if (r.message == "Negative") {
                                                        $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Red");
                                                    }
                                                    if (r.message == "Amber") {
                                                        $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Yellow");
                                                    }
                                                    if (r.message == "Insufficient") {
                                                        $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Orange");
                                                        frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                                        $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                                    }
                                                }
                                            })
                                        }
                                        if (r.message == "Entry Pending") {
                                            $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Aquamarine");
                                        }
                                        if (r.message == "Entry Completed") {
                                            $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "DeepSkyBlue");
                                        }
                                        if (r.message == "IQC Completed") {
                                            $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Fuchsia");
                                        }
                                        if (r.message == "Insufficient") {
                                            frm.set_value("tat_stop_date", frappe.datetime.nowdate());
                                            $(cur_frm.fields_dict.tat_stop_date.input).css("borderColor", "Orange");
                                            $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Orange");
                                        }
                                    } else {
                                        $(cur_frm.fields_dict.id_check6.input).css("backgroundColor", "Aquamarine");
                                    }
                                }
                            })
                        }

                    }
                }
            })
        }
        frm.set_query("checks_group", function () {
            return {
                query: "bvs.utils.get_groups",
                filters: {
                    customer: frm.doc.customer
                }
            };
        });
        if (frm.doc.checks_group) {
            frappe.call({
                method: "bvs.utils.get_group_checks",
                args: {
                    "checks_group": frm.doc.checks_group
                },
                callback: function (r) {
                    (r.message || []).forEach(function (d) {
                        if (d === "employment_check1") {
                            frm.toggle_display('employment_check1', d === "employment_check1");
                        }
                        if (d === "employment_check2") {
                            frm.toggle_display('employment_check2', d === "employment_check2");
                        }
                        if (d === "employment_check3") {
                            frm.toggle_display('employment_check3', d === "employment_check3");
                        }
                        if (d === "employment_check4") {
                            frm.toggle_display('employment_check4', d === "employment_check4");
                        }
                        if (d === "education_check1") {
                            frm.toggle_display('education_check1', d === "education_check1");
                        }
                        if (d === "education_check2") {
                            frm.toggle_display('education_check2', d === "education_check2");
                        }
                        if (d === "education_check3") {
                            frm.toggle_display('education_check3', d === "education_check3");
                        }
                        if (d === "education_check4") {
                            frm.toggle_display('education_check4', d === "education_check4");
                        }
                        if (d === "family_check1") {
                            frm.toggle_display('family_check1', d === "family_check1");
                        }
                        if (d === "family_check2") {
                            frm.toggle_display('family_check2', d === "family_check2");
                        }
                        if (d === "family_check3") {
                            frm.toggle_display('family_check3', d === "family_check3");
                        }
                        if (d === "family_check4") {
                            frm.toggle_display('family_check4', d === "family_check4");
                        }
                        if (d === "reference_check1") {
                            frm.toggle_display('reference_check1', d === "reference_check1");
                        }
                        if (d === "reference_check2") {
                            frm.toggle_display('reference_check2', d === "reference_check2");
                        }
                        if (d === "reference_check3") {
                            frm.toggle_display('reference_check3', d === "reference_check3");
                        }
                        if (d === "reference_check4") {
                            frm.toggle_display('reference_check4', d === "reference_check4");
                        }
                        if (d === "id_check1") {
                            frm.toggle_display('id_check1', d === "id_check1");
                        }
                        if (d === "id_check2") {
                            frm.toggle_display('id_check2', d === "id_check2");
                        }
                        if (d === "id_check3") {
                            frm.toggle_display('id_check3', d === "id_check3");
                        }
                        if (d === "id_check4") {
                            frm.toggle_display('id_check4', d === "id_check4");
                        }
                        if (d === "id_check5") {
                            frm.toggle_display('id_check5', d === "id_check5");
                        }
                        if (d === "id_check6") {
                            frm.toggle_display('id_check6', d === "id_check6");
                        }
                        if (d === "address_check1") {
                            frm.toggle_display('address_check1', d === "address_check1");
                        }
                        if (d === "address_check2") {
                            frm.toggle_display('address_check2', d === "address_check2");
                        }
                        if (d === "address_check3") {
                            frm.toggle_display('address_check3', d === "address_check3");
                        }
                        if (d === "address_check4") {
                            frm.toggle_display('address_check4', d === "address_check4");
                        }
                        if (d === "civil_check") {
                            frm.toggle_display('civil_check', d === "civil_check");
                        }
                        if (d === "criminal_check") {
                            frm.toggle_display('criminal_check', d === "criminal_check");
                        }
                        if (d === "id_check") {
                            frm.toggle_display('id_check', d === "id_check");
                        }
                    });

                }
            });
        }
    },
    onload: function (frm) {
        if (frm.doc.status == "QC Pending" && frm.doc.executive != "") {
            frm.set_value("qc_completed_date", frappe.datetime.nowdate())
            frm.set_value("qc_completed_executive", frappe.session.user)
        }
        if (frm.doc.status == "Allocation Pending" && frm.doc.executive != "") {
            frm.set_value("allocation_completed_date", frappe.datetime.nowdate())
            frm.set_value("execution_completed_executive", frm.doc.executive);
        }
        status = frm.doc.status;
        frm.toggle_display(["id_check", 'employment_check1', 'employment_check2', 'employment_check3', 'employment_check4', 'education_check1', 'education_check2', 'education_check3', 'education_check4', 'reference_check1', 'reference_check2', 'reference_check3', 'reference_check4',
            'address_check1', 'address_check2', 'address_check3', 'address_check4', 'id_check1', 'id_check2', 'id_check3', 'id_check4', 'id_check5', 'id_check6', 'family_check1', 'family_check2', 'family_check3', 'family_check4', 'civil_check', 'criminal_check']);
        if (frm.doc.status == "Insufficient") {
            frm.set_value("modified_actual_end_date", "TAT Resumed")
        }

    },
    checks_group: function (frm) {
        if (frm.doc.checks_group) {
            frappe.call({
                method: "bvs.utils.get_group_checks",
                args: {
                    "checks_group": frm.doc.checks_group
                },
                callback: function (r) {
                    (r.message || []).forEach(function (d) {
                        if (d === "employment_check1") {
                            frm.toggle_display('employment_check1', d === "employment_check1");
                        }
                        if (d === "employment_check2") {
                            frm.toggle_display('employment_check2', d === "employment_check2");
                        }
                        if (d === "employment_check3") {
                            frm.toggle_display('employment_check3', d === "employment_check3");
                        }
                        if (d === "employment_check4") {
                            frm.toggle_display('employment_check4', d === "employment_check4");
                        }
                        if (d === "education_check1") {
                            frm.toggle_display('education_check1', d === "education_check1");
                        }
                        if (d === "education_check2") {
                            frm.toggle_display('education_check2', d === "education_check2");
                        }
                        if (d === "education_check3") {
                            frm.toggle_display('education_check3', d === "education_check3");
                        }
                        if (d === "education_check4") {
                            frm.toggle_display('education_check4', d === "education_check4");
                        }
                        if (d === "family_check1") {
                            frm.toggle_display('family_check1', d === "family_check1");
                        }
                        if (d === "family_check2") {
                            frm.toggle_display('family_check2', d === "family_check2");
                        }
                        if (d === "family_check3") {
                            frm.toggle_display('family_check3', d === "family_check3");
                        }
                        if (d === "family_check4") {
                            frm.toggle_display('family_check4', d === "family_check4");
                        }
                        if (d === "reference_check1") {
                            frm.toggle_display('reference_check1', d === "reference_check1");
                        }
                        if (d === "reference_check2") {
                            frm.toggle_display('reference_check2', d === "reference_check2");
                        }
                        if (d === "reference_check3") {
                            frm.toggle_display('reference_check3', d === "reference_check3");
                        }
                        if (d === "reference_check4") {
                            frm.toggle_display('reference_check4', d === "reference_check4");
                        }
                        if (d === "id_check1") {
                            frm.toggle_display('id_check1', d === "id_check1");
                        }
                        if (d === "id_check2") {
                            frm.toggle_display('id_check2', d === "id_check2");
                        }
                        if (d === "id_check3") {
                            frm.toggle_display('id_check3', d === "id_check3");
                        }
                        if (d === "id_check4") {
                            frm.toggle_display('id_check4', d === "id_check4");
                        }
                        if (d === "id_check5") {
                            frm.toggle_display('id_check5', d === "id_check5");
                        }
                        if (d === "id_check6") {
                            frm.toggle_display('id_check6', d === "id_check6");
                        }
                        if (d === "address_check1") {
                            frm.toggle_display('address_check1', d === "address_check1");
                        }
                        if (d === "address_check2") {
                            frm.toggle_display('address_check2', d === "address_check2");
                        }
                        if (d === "address_check3") {
                            frm.toggle_display('address_check3', d === "address_check3");
                        }
                        if (d === "address_check4") {
                            frm.toggle_display('address_check4', d === "address_check4");
                        }
                        if (d === "civil_check") {
                            frm.toggle_display('civil_check', d === "civil_check");
                        }
                        if (d === "criminal_check") {
                            frm.toggle_display('criminal_check', d === "criminal_check");
                        }
                        if (d === "id_check") {
                            frm.toggle_display('id_check', d === "id_check");
                        }
                    });

                }
            });
        }
    },
    "employment_check1": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Employment Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Employment Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Employment Check1', 'New Employment Check1', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Employment Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Employment Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Employment Check1', 'New Verify Employment Check1', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "employment_check2": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Employment Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Employment Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Employment Check2', 'New Employment Check2', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Employment Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Employment Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Employment Check2', 'New Verify Employment Check2', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "employment_check3": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Employment Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Employment Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Employment Check3', 'New Employment Check3', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Employment Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Employment Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Employment Check3', 'New Verify Employment Check3', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }

    },
    "employment_check4": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Employment Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Employment Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Employment Check4', 'New Employment Check4', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Employment Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Employment Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Employment Check4', 'New Verify Employment Check4', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },

    "education_check1": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Education Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Education Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Education Check1', 'New Education Check1', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Education Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Education Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Education Check1', 'New Verify Education Check1', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "education_check2": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Education Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Education Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Education Check2', 'New Education Check2', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Education Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Education Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Education Check2', 'New Verify Education Check2', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "education_check3": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Education Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Education Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Education Check3', 'New Education Check3', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Education Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Education Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Education Check3', 'New Verify Education Check3', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "education_check4": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Education Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Education Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Education Check4', 'New Education Check4', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Education Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Education Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Education Check4', 'New Verify Education Check4', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "family_check1": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Family Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Family Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Family Check1', 'New Family Check1', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Family Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Family Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Family Check1', 'New Verify Family Check1', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "family_check2": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Family Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Family Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Family Check2', 'New Family Check2', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Family Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Family Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Family Check2', 'New Verify Family Check2', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "family_check3": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Family Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Family Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Family Check3', 'New Family Check3', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Family Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Family Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Family Check3', 'New Verify Family Check3', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "family_check4": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Family Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Family Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Family Check4', 'New Family Check4', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Family Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Family Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Family Check4', 'New Verify Family Check4', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "address_check1": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Address Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Address Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Address Check1', 'New Address Check1', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Address Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Address Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Address Check1', 'New Verify Address Check1', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "address_check2": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Address Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Address Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Address Check2', 'New Address Check2', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Address Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Address Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Address Check2', 'New Verify Address Check2', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "address_check3": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Address Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Address Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Address Check3', 'New Address Check3', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Address Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Address Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Address Check3', 'New Verify Address Check3', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "address_check4": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Address Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Address Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Address Check4', 'New Address Check4', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Address Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Address Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Address Check4', 'New Verify Address Check4', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "id_check1": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "ID Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'ID Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'ID Check1', 'New ID Check1', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify ID Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify ID Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify ID Check1', 'New Verify ID Check1', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "id_check2": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "ID Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'ID Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'ID Check2', 'New ID Check2', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify ID Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify ID Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify ID Check2', 'New Verify ID Check2', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "id_check3": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "ID Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'ID Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'ID Check3', 'New ID Check3', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify ID Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify ID Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify ID Check3', 'New Verify ID Check3', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "id_check4": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "ID Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'ID Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'ID Check4', 'New ID Check4', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify ID Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify ID Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify ID Check4', 'New Verify ID Check4', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "id_check5": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "ID Check5"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'ID Check5', r.message);
                    } else {
                        frappe.set_route('Form', 'ID Check5', 'New ID Check5', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify ID Check5"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify ID Check5', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify ID Check5', 'New Verify ID Check5', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "id_check6": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "ID Check6"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'ID Check6', r.message);
                    } else {
                        frappe.set_route('Form', 'ID Check6', 'New ID Check6', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify ID Check6"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify ID Check6', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify ID Check6', 'New Verify ID Check6', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "reference_check1": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Reference Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Reference Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Reference Check1', 'New Reference Check1', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Reference Check1"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Reference Check1', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Reference Check1', 'New Verify Reference Check1', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "reference_check2": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Reference Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Reference Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Reference Check2', 'New Reference Check2', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Reference Check2"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Reference Check2', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Reference Check2', 'New Verify Reference Check2', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "reference_check3": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Reference Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Reference Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Reference Check3', 'New Reference Check3', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Reference Check3"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Reference Check3', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Reference Check3', 'New Verify Reference Check3', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "reference_check4": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Reference Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Reference Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Reference Check4', 'New Reference Check4', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Reference Check4"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Reference Check4', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Reference Check4', 'New Verify Reference Check4', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "civil_check": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Civil Check"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Civil Check', r.message);
                    } else {
                        frappe.set_route('Form', 'Civil Check', 'New Civil Check', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Civil Check"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Civil Check', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Civil Check', 'New Verify Civil Check', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    },
    "criminal_check": function (frm) {
        if (frappe.user.has_role("BVS DEO") || (frm.doc.allocated_for == "IQC Pending")) {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Criminal Check"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Criminal Check', r.message);
                    } else {
                        frappe.set_route('Form', 'Criminal Check', 'New Criminal Check', { "tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        } else {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
                    "applicant": frm.doc.name,
                    "check": "Verify Criminal Check"
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.set_route('Form', 'Verify Criminal Check', r.message);
                    } else {
                        frappe.set_route('Form', 'Verify Criminal Check', 'New Verify Criminal Check', { "applicant_name": frm.doc.candidate_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.name });
                    }
                }
            });
        }
    }

});



