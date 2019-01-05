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
import datetime
from datetime import date, timedelta as td

class Applicant(Document):
    pass
    # def validate(self):
    #     self.status = get_status(self.name,self.checks_group)


@frappe.whitelist()
def get_check(applicant,check):
    check = frappe.db.get_value(check, {"applicant_id": applicant},
                                     ["name"])
    return check					   


@frappe.whitelist()
def get_status(applicant,checks_group):
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
                   checks.append("Driving License Verification")
                if i == "civil_check":
                   checks.append("Civil Check")
                if i == "criminal_check":
                   checks.append("Criminal Check")
        check1 = []
        for e in checks:
            check1.append(frappe.db.get_value(e, {"applicant_id": applicant}, "status"))
        if all(check == "Entry Completed" for check in check1):
            status = "IQC Pending"
        elif all(check == "IQC Completed" for check in check1):
            status = "Allocation Pending"
        elif all(check == "Allocation Completed" for check in check1):
            status = "Allocation Completed"
        elif any(check == "Insufficient" for check in check1):
            status = "Insufficient"
        elif any(check == "Entry Pending" for check in check1):
            status = "Entry Pending"
        check2 = []
        check3 = []
        if status == "Allocation Completed":
            for c in checks:
                check3.append(frappe.db.get_value("Verify "+c, {"applicant_id": applicant}, "status"))
            if all(check == "QC Completed" for check in check3):
                status = "QC Completed" 
            if all(check == "Execution Completed" for check in check3):
                status = "QC Pending" 
        if status == "QC Completed":
            for c in checks:
                check2.append(frappe.db.get_value("Verify "+c, {"applicant_id": applicant}, "result")) 
            if all(result == "Positive" for result in check2):
                status = "Positive" 
            if any(check == "Negative" for check in check2):
                status = "Negative" 
            if any(check == "Amber" for check in check2):
                status = "Amber"
            if any(check == "Insufficient" for check in check2):
                status = "Insufficient"
        # frappe.get_doc("Applicant", applicant) 
    return status


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
            app_id.save(ignore_permissions=True)
            frappe.db.commit()
    test = ["Verify Employment Check1","Verify Employment Check2","Verify Employment Check3","Verify Employment Check4","Verify Education Check1","Verify Education Check2","Verify Education Check3","Verify Education Check4",
    "Verify Address Check1","Verify Address Check2","Verify Address Check3","Verify Address Check4","Verify Family Check1","Verify Family Check2","Verify Family Check3","Verify Family Check4","Verify Reference Check1","Verify Reference Check2",
    "Verify Reference Check3","Verify Reference Check4","Verify Civil Check","Verify Criminal Check","Verify Aadhar Card Verification","Verify Pan Verification","Verify Passport Verification","Verify Voters ID Verification","Verify Driving License Verification",
    "Verify Ration Card Verification"]         
    for t in test:
        query = """select name from `tab%s` where status = 'Allocation Pending'"""% (t)   
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


@frappe.whitelist()
def daterange(start_date,end_date,holiday):
    start = datetime.datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.datetime.strptime(end_date, "%Y-%m-%d")
    date_array = \
        (start + datetime.timedelta(days=x) for x in range(0, (end-start).days)) 
    dates = []  
    for date_object in date_array:
        dates.append(date_object.strftime("%Y-%m-%d"))
    return dates
        


@frappe.whitelist()
def get_checks_group(applicant,checks_group,doctype,check_status):
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
                   checks.append("Driving License Verification")
                if i == "civil_check":
                   checks.append("Civil Check")
                if i == "criminal_check":
                   checks.append("Criminal Check")
        for check in checks:
            if check_status == "QC Completed":
                if frappe.get_all("Verify "+check,{"applicant_id": applicant}):
                    next_doc = frappe.get_doc("Verify "+check,{"applicant_id": applicant})
                    if next_doc.status != check_status:
                        return next_doc
                        # frappe.errprint(next_doc)
                    else:
                        pass
            else:
                if frappe.get_all(check,{"applicant_id": applicant}):
                    next_doc = frappe.get_doc(check,{"applicant_id": applicant})           
                    if next_doc.status != check_status:
                        return next_doc
                    else:
                        pass
                else:
                    return check
            
        return "Completed"


@frappe.whitelist()
def update_checks(checks_group,aadhar_card,pan_card,passport,ration_card,voters_id,driving_license):
    if checks_group:
        check_id = frappe.db.get_value("Checks Group", {"name": checks_group})
        if check_id:
            exist_check_id = frappe.get_doc("Checks Group", check_id)
        else:
            exist_check_id = frappe.new_doc("Checks Group")
        exist_check_id.update({
            "aadhar_card_verification": aadhar_card,
            "pan_verification": pan_card,
            "driving_license_verification": driving_license,
            "passport_verification": passport,
        	"ration_card_verification": ration_card,
            "voters_id_verification": voters_id
        })
        exist_check_id.save(ignore_permissions=True)
    return "Ok"