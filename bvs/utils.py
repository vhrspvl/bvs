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
    if cg.employment_check:
        checklist.append('employment1')
    if cg.second_employment:
        checklist.append('employment2')
    if cg.third_employment:
        checklist.append('employment3')
    if cg.education_check:
        checklist.append('education1')
    if cg.second_education:
        checklist.append('education2')
    if cg.third_education:
        checklist.append('education3')
    if cg.reference_check:
        checklist.append('reference1')
    if cg.second_reference:
        checklist.append('reference2')
    if cg.third_reference:
        checklist.append('reference3')
    if cg.identity_check:
        checklist.append('aadhar')
    if cg.driving_license_verification:
        checklist.append('driving')
    if cg.voter_id_verification:
        checklist.append('voter')
    if cg.pan_card_verification:
        checklist.append('pan')
    if cg.passport_verification:
        checklist.append('passport')
    if cg.family_detail_check:
        checklist.append('family')
    if cg.criminal_check:
        checklist.append('criminal')
    if cg.court_record_check:
        checklist.append('court')
    if cg.address_check:
        checklist.append('address')
    return checklist
