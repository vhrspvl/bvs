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
    if cg.aadhar_card_verification:
        checklist.append('aadhar_card_verification')
    if cg.pan_verification:
        checklist.append('pan_verification')
    if cg.driving_license_verification:
        checklist.append('driving_license_verification')
    if cg.passport_verification:
        checklist.append('passport_verification')
    if cg.ration_card_verification:
        checklist.append('ration_card_verification')
    if cg.voters_id_verification:
        checklist.append('voters_id_verification')
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
    return checklist
