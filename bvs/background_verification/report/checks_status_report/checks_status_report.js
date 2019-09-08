// Copyright (c) 2016, VHRS and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Checks Status Report"] = {
    "filters": [
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "default": [frappe.datetime.add_months(frappe.datetime.get_today())],
            "reqd": 1
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "default": [frappe.datetime.add_months(frappe.datetime.get_today())],
            "reqd": 1
        },
    ]
}
