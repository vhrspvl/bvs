# Copyright (c) 2013, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _, msgprint
from frappe.utils import (cint, cstr, date_diff, flt, getdate, money_in_words,
                          nowdate, rounded, today)
from datetime import datetime
from datetime import date
import datetime
from calendar import monthrange


def execute(filters=None):
    columns = get_columns()
    data = []
    row = []
    filters
    applicant = applicants(filters)
    for app in applicant:
        row = [app.customer, app.ref_id, app.candidate_name,
                app.in_date, app.status, app.checks_group]
        if app.status != "Entry Pending":
            cg = frappe.get_doc("Checks Group", app.checks_group)
            if cg.employment_check1 == 1:
                emp = frappe.get_doc("Employment Check1", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Employment Check1", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.employment_check2 == 1:
                emp = frappe.get_doc("Employment Check2", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Employment Check2", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.employment_check3 == 1:
                emp = frappe.get_doc("Employment Check3", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Employment Check3", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.employment_check4 == 1:
                emp = frappe.get_doc("Employment Check4", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Employment Check4", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.education_check1 == 1:
                if frappe.db.exists("Education Check1", {
                        "applicant_id": app.ref_id}):
                    emp = frappe.get_doc("Education Check1", {
                        "applicant_id": app.ref_id})
                    if emp.status != "Allocation Completed":
                        row += [emp.status]
                    else:
                        vemp = frappe.get_doc("Verify Education Check1", {
                            "applicant_id": app.ref_id})
                        row += [vemp.status]
            else:
                row += ["-"]
            if cg.education_check2 == 1:
                emp = frappe.get_doc("Education Check2", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Education Check2", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.education_check3 == 1:
                emp = frappe.get_doc("Education Check3", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Education Check3", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.education_check4 == 1:
                emp = frappe.get_doc("Education Check4", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Education Check4", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.address_check1 == 1:
                emp = frappe.get_doc("Address Check1", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Address Check1", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.address_check2 == 1:
                emp = frappe.get_doc("Address Check2", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Address Check2", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.address_check3 == 1:
                emp = frappe.get_doc("Address Check3", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Address Check3", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.address_check4 == 1:
                emp = frappe.get_doc("Address Check4", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Address Check4", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.family_check1 == 1:
                emp = frappe.get_doc("Family Check1", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Family Check1", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.reference_check1 == 1:
                emp = frappe.get_doc("Reference Check1", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Reference Check1", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.reference_check2 == 1:
                emp = frappe.get_doc("Reference Check2", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Reference Check2", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.reference_check3 == 1:
                emp = frappe.get_doc("Reference Check3", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Reference Check3", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.reference_check4 == 1:
                emp = frappe.get_doc("Reference Check4", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Reference Check4", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.civil_check == 1:
                emp = frappe.get_doc("Civil Check", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Civil Check", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.criminal_check == 1:
                emp = frappe.get_doc("Criminal Check", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify Criminal Check", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.id_check1 == 1:
                emp = frappe.get_doc("ID Check1", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify ID Check1", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.id_check2 == 1:
                emp = frappe.get_doc("ID Check2", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify ID Check2", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.id_check3 == 1:
                emp = frappe.get_doc("ID Check3", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify ID Check3", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.id_check4 == 1:
                emp = frappe.get_doc("ID Check4", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify ID Check4", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.id_check5 == 1:
                emp = frappe.get_doc("ID Check5", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify ID Check5", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
            if cg.id_check6 == 1:
                emp = frappe.get_doc("ID Check6", {
                    "applicant_id": app.ref_id})
                if emp.status != "Allocation Completed":
                    row += [emp.status]
                else:
                    vemp = frappe.get_doc("Verify ID Check6", {
                        "applicant_id": app.ref_id})
                    row += [vemp.status]
            else:
                row += ["-"]
        data.append(row)
    return columns, data


def get_columns():
    columns = [
        _("Project Name") + ":Link/Customer:200",
        _("VHRS Ref. No") + ":Data:150",
        _("Candidate Name") + ":Data:180",
        _("Start Date") + ":Date:150",
        _("Status") + ":Data:150",
        _("Checks Group Name") + ":Data:150",
        _("Emp Check1 Status") + ":Data:150",
        _("Emp Check2 Status") + ":Data:150",
        _("Emp Check3 Status") + ":Data:150",
        _("Emp Check4 Status") + ":Data:150",
        _("Edu Check1 Status") + ":Data:150",
        _("Edu Check2 Status") + ":Data:150",
        _("Edu Check3 Status") + ":Data:150",
        _("Edu Check4 Status") + ":Data:150",
        _("Add Check1 Status") + ":Data:150",
        _("Add Check2 Status") + ":Data:150",
        _("Add Check3 Status") + ":Data:150",
        _("Add Check4 Status") + ":Data:150",
        _("Family Check Status") + ":Data:150",
        _("Ref Check1 Status") + ":Data:150",
        _("Ref Check2 Status") + ":Data:150",
        _("Ref Check3 Status") + ":Data:150",
        _("Ref Check4 Status") + ":Data:150",
        _("Civil Check1 Status") + ":Data:150",
        _("Criminal Check2 Status") + ":Data:150",
        _("ID Check1 Status") + ":Data:150",
        _("ID Check2 Status") + ":Data:150",
        _("ID Check3 Status") + ":Data:150",
        _("ID Check4 Status") + ":Data:150",
        _("ID Check5 Status") + ":Data:150",
        _("ID Check6 Status") + ":Data:150",

    ]
    return columns


def applicants(filters):
    applicant = frappe.db.sql(
        """select app.checks_group,app.customer,app.ref_id,app.candidate_name,app.in_date,app.status from `tabApplicant` app where
        app.in_date between %(start_date)s and %(end_date)s order by app.in_date""", {
            "start_date": filters.get("from_date"),
            "end_date": filters.get("to_date")
        }, as_dict=1)
    return applicant
