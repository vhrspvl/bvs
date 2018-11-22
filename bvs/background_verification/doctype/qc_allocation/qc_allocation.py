# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import frappe,json
from frappe.model.document import Document

class QCAllocation(Document):
	pass



@frappe.whitelist()
def get_applicant(customer):
    applicant = frappe.db.get_list("Applicant", {"customer": customer,"executive":""},
                                     ["name"])
    return applicant


@frappe.whitelist()
def get_applicant_details(applicant):
    applicant = frappe.get_doc("Applicant", {"name":applicant})
    return applicant

@frappe.whitelist()
def set_assign_to(doc):
    executives = {}
    executives = json.loads(doc)
    for e in executives:
        docstatus = e.get("status")
        doctype = "Applicant"
        docname = e.get("applicant")
        docallocate = e.get("allocated_to")
        doc = frappe.get_doc(doctype,docname)
        args = {
            'allocated_for': docstatus,
            'executive': docallocate,
            'assigned_date': frappe.utils.nowdate()
        }
        doc.update(args)
        doc.save(ignore_permissions=True)
        frappe.db.commit()
        entry_check = ["employment_check1","employment_check2","employment_check3","employment_check4","education_check1","education_check2","education_check3","education_check4",
        "address_check1","address_check2","address_check3","address_check4","family_check1","family_check2","family_check3","family_check4","reference_check1","reference_check2","reference_check3","reference_check4",
        "aadhar_card_verification","pan_verification","passport_verification","voters_id_verification","ration_card_verification","driving_license_verification","civil_check","criminal_check"]
        status = "Entry Pending"
        applicant_cg = frappe.get_all("Checks Group", ["*"], {"name":doc.checks_group})
        for a in applicant_cg:
            checks = []
            for i in entry_check:
                if a.get(i) == 1:
                    if i == "employment_check1":
                        checks.append("Employment Check1")
                    if i == "employment_check2":
                        checks.append("Employment Check2")
                    if i == "employment_check3":
                        checks.append("Employment Check3")
                    if i == "employment_check4":
                        checks.append("Employment Check4")
                    if i == "education_check1":
                        checks.append("Education Check1")
                    if i == "education_check2":
                        checks.append("Education Check2")
                    if i == "education_check3":
                        checks.append("Education Check3")
                    if i == "education_check4":
                        checks.append("Education Check4")
                    if i == "address_check1":
                        checks.append("Address Check1")
                    if i == "address_check2":
                        checks.append("Address Check2")
                    if i == "address_check3":
                        checks.append("Address Check3")
                    if i == "address_check4":
                        checks.append("Address Check4")
                    if i == "family_check1":
                        checks.append("Family Check1")
                    if i == "family_check2":
                        checks.append("Family Check2")
                    if i == "family_check3":
                        checks.append("Family Check3")
                    if i == "family_check4":
                        checks.append("Family Check4")
                    if i == "reference_check1":
                        checks.append("Reference Check1")
                    if i == "reference_check2":
                        checks.append("Reference Check2")
                    if i == "reference_check3":
                        checks.append("Reference Check3")
                    if i == "reference_check4":
                        checks.append("Reference Check4")
                    if i == "aadhar_card_verification":
                        checks.append("Aadhar Card Verification")
                    if i == "pan_verification":
                        checks.append("Pan Verification")
                    if i == "passport_verification":
                        checks.append("Passport Verification")
                    if i == "voters_id_verification":
                        checks.append("Voters ID Verification")
                    if i == "ration_card_verification":
                        checks.append("Ration Card Verification")
                    if i == "driving_license_verification":
                        checks.append("driving License Verification")
                    if i == "civil_check":
                        checks.append("Civil Check")
                    if i == "criminal_check":
                        checks.append("Criminal Check") 
            for check in checks:
                docstatus = e.get("status")
                doctype = "Applicant"
                docname = e.get("applicant")
                docallocate = e.get("allocated_to")
                docs = frappe.get_doc(check,{"applicant_id":docname})
                args = {
                    'allocated_for': docstatus,
                    'executive': docallocate,
                    'assigned_date': frappe.utils.nowdate()
                }
                docs.update(args)
                docs.save(ignore_permissions=True)
                frappe.db.commit()
            if docstatus == "QC Pending":
                for check in checks:
                    docstatus = e.get("status")
                    doctype = "Applicant"
                    docname = e.get("applicant")
                    docallocate = e.get("allocated_to")
                    docs = frappe.get_doc("Verify "+check,{"applicant_id":docname})
                    args = {
                        'allocated_for': docstatus,
                        'executive': docallocate,
                        'assigned_date': frappe.utils.nowdate(),
                        'status': "Execution Completed"
                    }
                    docs.update(args)
                    docs.save(ignore_permissions=True)
                    frappe.db.commit()
    return "ok"