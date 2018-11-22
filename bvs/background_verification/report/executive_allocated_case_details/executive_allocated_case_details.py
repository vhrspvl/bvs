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
    app = applicants(filters)
    for a in app:
        row = [a.in_date,a.in_date,a.customer,a.ref_id,a.candidate_name,a.client_employee_code,a.executive,a.status,a.remarks,a.end_date]
        data.append(row)
        if not a.end_date:
            today_date = date.today()
            row += [today_date - a.in_date]
        else:
            row += [a.end_date - a.in_date]    
        row += [a.tat_stop_date,a.tat_resume_date]   
    return columns, data


def get_columns():
    columns = [
        _("Case Received Date") + ":Date:150",
        _("Allocated Date") + ":Date:150",
        _("Client Name") + ":Link/Customer:150",
        _("VHRS ref No") + ":Data:150",
        _("Name") + ":Data:150",
        _("Emp code") + ":Data:150",
        _("Allocated To") + ":Data:150",
        _("Status") + ":Data:150",
        _("Remarks") + ":Data:150",
        _("Closed Date") + ":Date:150",
        _("Ageing") + ":Int:180",
        _("Insuff Raised Date") + ":Date:150",
        _("Insuff Cleared Date") + ":Date:150"
    ]
    return columns

def applicants(filters):
    applicant = frappe.db.sql(
        """select `tabData Entry Allocation`.in_date,`tabApplicant`.customer,`tabApplicant`.ref_id,`tabVerify Education Check1`.applicant_id,`tabApplicant`.candidate_name,`tabApplicant`.ref_id,`tabApplicant`.client_employee_code,`tabApplicant`.executive,`tabApplicant`.status,`tabApplicant`.end_date,`tabApplicant`.tat_stop_date,`tabApplicant`.tat_resume_date,`tabApplicant`.remarks  from `tabApplicant` 
        LEFT JOIN `tabData Entry Allocation` ON `tabApplicant`.data_entry_allocation_id = `tabData Entry Allocation`.name
        LEFT JOIN `tabVerify Education Check1` ON `tabApplicant`.name = `tabVerify Education Check1`.applicant_id where
        `tabApplicant`.executive != "" and `tabApplicant`.in_date between %(start_date)s and %(end_date)s order by `tabApplicant`.in_date""",{
        "start_date": filters.get("from_date"),
        "end_date": filters.get("to_date")
        }, as_dict = 1)
    return applicant


