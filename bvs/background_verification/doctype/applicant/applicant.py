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
    check = ["Verify Employment Check1","Verify Employment Check2","Verify Employment Check3","Verify Employment Check4","Verify Education Check1"]
    status = "Pending"
    for c in check:
        check1 = frappe.db.get_value(c, {"applicant_id": applicant}, "status")
        if check1 == "Completed":
            status = "Completed"
    if status == "Completed":
        status = "Positive"
        for c in check:
            check2 = frappe.db.get_value(c, {"applicant_id": applicant}, "result")
            if check2 == "Negative":
                status = "Negative"  
                frappe.errprint(check2)
    applicant_id = frappe.get_doc("Applicant",applicant) 
    applicant_id.status = status
    applicant_id.db_update()
    frappe.db.commit()  
          
    return "ok"



@frappe.whitelist()
def get_tat():
    applicant = frappe.db.sql(""" select name from `tabApplicant` where status = 'Pending'""", as_dict = 1)
    for app in applicant:
        app = frappe.get_doc("Applicant", app["name"])
        in_date = app.in_date
        # tat = timedelta(days=int(app.tat))
        print app.tat
        if app.in_date:
            today = date.today()
            day = (today - in_date).days
            tat = app.tat - day
            app.update({
                "tat": tat
            })
            app.save(ignore_permissions=True)
            frappe.db.commit()

