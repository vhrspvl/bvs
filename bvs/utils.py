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
    if cg.employment_check1:
        checklist.append('employment_check1')
    if cg.employment_check2:
        checklist.append('employment_check2')
    if cg.employment_check3:
        checklist.append('employment_check3')
    if cg.employment_check4:
        checklist.append('employment_check4')
    if cg.education_check1:
        checklist.append('education_check1')
    if cg.education_check2:
        checklist.append('education_check2')
    if cg.education_check3:
        checklist.append('education_check3')
    if cg.education_check4:
        checklist.append('education_check4')
    if cg.address_check1:
        checklist.append('address_check1')
    if cg.address_check2:
        checklist.append('address_check2')
    if cg.address_check3:
        checklist.append('address_check3')
    if cg.address_check4:
        checklist.append('address_check4')
    if cg.reference_check1:
        checklist.append('reference_check1')
    if cg.reference_check2:
        checklist.append('reference_check2')
    if cg.reference_check3:
        checklist.append('reference_check3')
    if cg.reference_check4:
        checklist.append('reference_check4')
    if cg.id_check1:
        checklist.append('id_check1')
    if cg.id_check2:
        checklist.append('id_check2')
    if cg.id_check3:
        checklist.append('id_check3')
    if cg.id_check4:
        checklist.append('id_check4')
    if cg.id_check5:
        checklist.append('id_check5')
    if cg.id_check6:
        checklist.append('id_check6')
    if cg.family_check1:
        checklist.append('family_check1')
    if cg.family_check2:
        checklist.append('family_check2')
    if cg.family_check3:
        checklist.append('family_check3')
    if cg.family_check4:
        checklist.append('family_check4')
    if cg.civil_check:
        checklist.append('civil_check')
    if cg.criminal_check:
        checklist.append('criminal_check')
    if cg.id_check:
        checklist.append('id_check')
    if cg.political_check:
        checklist.append('political_check')
    if cg.neighbourhood_check:
        checklist.append('neighbourhood_check')
    return checklist
