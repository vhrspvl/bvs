frappe.query_reports["Employment 3 MIS"] = {
	"filters": [
		{
			"fieldname": "from_date",
			"label": __("In Date From"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today(),
			"reqd": 1
        },
        {
			"fieldname": "to_date",
			"label": __("To"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today(),
			"reqd": 1
        }
    ]
}