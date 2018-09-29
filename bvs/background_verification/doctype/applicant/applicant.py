# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
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
def get_status(applicant):
    check = ["Verify Employment Check1","Verify Employment Check2","Verify Employment Check3","Verify Employment Check4","Verify Education Check1","Verify Education Check2","Verify Education Check3","Verify Education Check4",
    "Verify Address Check1","Verify Address Check2","Verify Address Check3","Verify Address Check4","Verify Family Check1","Verify Family Check2","Verify Family Check3","Verify Family Check4","Verify Reference Check1","Verify Reference Check2",
    "Verify Reference Check3","Verify Reference Check4","Verify Civil Check","Verify Criminal Check","Verify Aadhar Card Verification","Verify Pan Verification","Verify Passport Verification","Verify Voters ID Verification","Verify Driving License Verification",
    "Verify Ration Card Verification"]
    entry_check = ["Employment Check1","Employment Check2","Employment Check3","Employment Check4","Education Check1","Education Check2","Education Check3","Education Check4","Address Check1","Address Check2","Address Check3","Address Check4",
    "Family Check1","Family Check2","Family Check3","Family Check4","Reference Check1","Reference Check2","Reference Check3","Reference Check4","Aadhar Card Verification","Pan Verification","Passport Verification","Voters ID Verification","Ration Card Verification","Driving License Verification"]
    status = "Pending"
    for e in entry_check:
        check1 = frappe.db.get_value(e, {"applicant_id": applicant}, "status")
        if check1 == "Entry Completed":
            status = "Completed"
        # if check1 == "IQC Completed":
        #     status = "Completed"
        # if check1 == "Allocation Completed":
        #     status = "Completed"
    # for c in check:
    #     check1 = frappe.db.get_value(c, {"applicant_id": applicant}, "status")
    #     if check1 == "Completed":
    #         status = "Completed"
    if status == "Completed":
        status = "Positive"
        for c in check:
            check2 = frappe.db.get_value(c, {"applicant_id": applicant}, "result")
            # if check2 == "Positive":
            #     status = "Positive" 
            if check2 == "Negative":
                status = "Negative" 
            if check2 == "Amber":
                status = "Amber"
            if check2 == "Insufficient":
                status = "Insufficient"
    applicant_id = frappe.get_doc("Applicant",applicant) 
    applicant_id.status = status
    applicant_id.db_update()
    frappe.db.commit()            
    return "ok"


@frappe.whitelist()
def get_tat():
    applicants = frappe.db.sql(""" select name from `tabApplicant` where status = 'Pending'""", as_dict = 1)
    for applicant in applicants:
        app_id = frappe.get_doc("Applicant",applicant["name"])
        tat = frappe.db.get_value("Checks Group", app_id.checks_group,"tat")
        in_date = app_id.in_date
        print in_date
        if in_date:
            today = date.today()
            day = (today - in_date).days
            tat =  tat - day 
            app_id.update({
                "tat": tat
            })
            app_id.save(ignore_permissions=True)
            frappe.db.commit()


