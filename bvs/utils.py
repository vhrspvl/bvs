import frappe
from frappe import _
from frappe.utils.data import today


@frappe.whitelist()
def get_groups(doctype, txt, searchfield, start, page_len, filters):
    if not filters.get("customer"):
        frappe.throw(_("Please select Customer first."))

    group_list = frappe.db.sql(
        """select cg.name from `tabChecks Group` cg where cg.customer = %s""", (filters.get("customer")))
    return group_list


@frappe.whitelist()
def get_group_checks(checks_group):
    cg = frappe.get_doc("Checks Group", checks_group)
    checklist = []
    if cg.education_check:
        checklist.append('education')
    if cg.employment_check:
         checklist.append('employment')
    return cg     
            
    
