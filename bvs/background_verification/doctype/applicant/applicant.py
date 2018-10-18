# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.utils.global_search import search
from frappe.utils import getdate, cint, add_months, date_diff, add_days, flt, nowdate, \
get_datetime_str, cstr, get_datetime, time_diff, time_diff_in_seconds, time_diff_in_hours,today
from datetime import date,datetime,timedelta

class Applicant(Document):
    pass
    # def autoname(self):
    #     self.name = make_autoname(
    #         self.customer + "-.####")

@frappe.whitelist()
def get_check(applicant,check):
    check = frappe.db.get_value(check, {"applicant_id": applicant},
                                     ["name"])
    return check					   



@frappe.whitelist()
def get_status(applicant,checks_group):
    check = ["Verify Employment Check1","Verify Employment Check2","Verify Employment Check3","Verify Employment Check4","Verify Education Check1","Verify Education Check2","Verify Education Check3","Verify Education Check4",
    "Verify Address Check1","Verify Address Check2","Verify Address Check3","Verify Address Check4","Verify Family Check1","Verify Family Check2","Verify Family Check3","Verify Family Check4","Verify Reference Check1","Verify Reference Check2",
    "Verify Reference Check3","Verify Reference Check4","Verify Civil Check","Verify Criminal Check","Verify Aadhar Card Verification","Verify Pan Verification","Verify Passport Verification","Verify Voters ID Verification","Verify Driving License Verification",
    "Verify Ration Card Verification"]
    entry_check = ["employment_check1","employment_check2","employment_check3","employment_check4","education_check1","education_check2","education_check3","education_check4",
    "address_check1","address_check2","address_check3","address_check4","family_check1","family_check2","family_check3","family_check4","reference_check1","reference_check2","reference_check3","reference_check4",
    "aadhar_card_verification","pan_verification","passport_verification","voters_id_verification","ration_card_verification","driving_license_verification","civil_check","criminal_check"]
    status = "Entry Pending"
    applicant_cg = frappe.get_all("Checks Group", ["*"], {"name":checks_group})
    for a in applicant_cg:
        checks = []
        for i in entry_check:
            if a.get(i) == 1:
                if i == "employment_check1":
                   checks.append("Employment Check1")
                if i == "employment_check2":
                   checks.append("Employement Check2")
                if i == "employment_check3":
                   checks.append("Employement Check3")
                if i == "employment_check4":
                   checks.append("Employement Check4")
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
        check1 = []
        for e in checks :
            check1.append(frappe.db.get_value(e, {"applicant_id": applicant}, "status"))
        if all(check == "Entry Completed" for check in check1):
            status = "IQC Pending"
        if all(check == "IQC Completed" for check in check1):
            status = "Allocation Pending"
        if all(check == "Allocation Completed" for check in check1):
            status = "QC Pending"
        check2 = []
        check3 = []
        if status == "Allocation Completed":
            for c in checks:
                check2.append(frappe.db.get_value("Verify "+c, {"applicant_id": applicant}, "result"))
                check3.append(frappe.db.get_value("Verify "+c, {"applicant_id": applicant}, "status"))
            if all(result == "Positive" for result in check2):
                status = "Positive"
            if all(check == "Negative" for check in check2):
                status = "Negative" 
            if all(check == "Amber" for check in check2):
                status = "Amber"
            if all(check == "Insufficient" for check in check2):
                status = "Insufficient" 
            if all(check == "QC Completed" for check in check3):
                status = "QC Completed" 
            if all(check == "QC pending" for check in check3):
                status = "QC Pending" 
        applicant_id = frappe.get_doc("Applicant",applicant) 
        applicant_id.assigned_date = ""
        applicant_id.executive = ""
        applicant_id.allocated_for = ""
        applicant_id.status = status
        # args = {
        #     "allocated_for": "",
        #     "executive": "",
        #     "assigned_date": "",
        #     "status": status
        # }
        applicant_id.db_update()
        # applicant_id.save(ignore_permissions=True)
        frappe.db.commit()            
        return "ok"


@frappe.whitelist()
def get_tat():
    applicants = frappe.db.sql(""" select name from `tabApplicant` where status = 'Pending'""", as_dict = 1)
    for applicant in applicants:
        app_id = frappe.get_doc("Applicant",applicant["name"])
        tat = frappe.db.get_value("Checks Group", app_id.checks_group,"tat")
        in_date = app_id.in_date
        if in_date:
            today = date.today()
            day = (today - in_date).days
            tat =  tat - day 
            app_id.update({
                "tat": tat
            })
            # print type(tat)
            app_id.save(ignore_permissions=True)
            frappe.db.commit()
    test = ["Verify Employment Check1","Verify Employment Check2","Verify Employment Check3","Verify Employment Check4","Verify Education Check1","Verify Education Check2","Verify Education Check3","Verify Education Check4",
    "Verify Address Check1","Verify Address Check2","Verify Address Check3","Verify Address Check4","Verify Family Check1","Verify Family Check2","Verify Family Check3","Verify Family Check4","Verify Reference Check1","Verify Reference Check2",
    "Verify Reference Check3","Verify Reference Check4","Verify Civil Check","Verify Criminal Check","Verify Aadhar Card Verification","Verify Pan Verification","Verify Passport Verification","Verify Voters ID Verification","Verify Driving License Verification",
    "Verify Ration Card Verification"]         
    for t in test:
        query = """select name from `tab%s` where status = 'Pending'"""% (t)   
        checks = frappe.db.sql(query,as_dict = 1)
        for check in checks:
            check_id = frappe.get_doc(t,check["name"])
            tat = check_id.tat
            in_date = check_id.in_date
            if in_date:
                today = date.today()
                day = (today - in_date).days
                tat =  tat - day 
                check_id.update({
                    "tat": tat
                })    
                # print day
                check_id.save(ignore_permissions=True)
                frappe.db.commit()
