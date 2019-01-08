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
    if not filters:
        filters = {}
    columns = get_columns(filters) 
    data = []
    conditions, filters = get_conditions(filters)
    app = get_applicants(filters)
    for a in app:
        row = [a.ref_id,a.customer,a.data_entry_allocation_id,a.in_date,a.in_time,a.entry_completed_executive,a.iqc_completed_executive,a.execution_completed_executive,a.qc_completed_executive,a.status]
        data.append(row)
        if not a.end_date:
            today_date = date.today()
            row += [today_date - a.in_date]
        else:
            row += [a.end_date - a.in_date]
        row += [a.tat_stop_date,a.tat_resume_date,a.end_date]
    return columns, data


def get_columns(filters):
    columns = [
        _("VHRS Ref. No") + ":Data:250",
        _("Client Name") + ":Link/Customer:150",
        _("Batch ID") + ":Link/Data Entry Allocation:150",
        _("Case Received Date") + ":Date:150",
        _("Case Received Time") + ":Time:150",
        _("Entry Completed Executive") + ":Data:150",
        _("IQC Completed Executive") + ":Data:150",
        _("Execution Completed Executive") + ":Data:150",
        _("QC Completed Executive") + ":Data:150",
        _("Status") + ":Data:150",
        _("Ageing") + ":Int:150",
        _("Insuff Raised Date") + ":Date:150",
        _("Insuff Cleared Date") + ":Date:150",
        _("Closed Date") + ":Date:150"
    ]
    return columns


def get_applicants(filters):
    applicant = frappe.db.sql(
        """select  app.ref_id,app.customer,app.data_entry_allocation_id,app.entry_completed_executive,app.iqc_completed_executive,app.execution_completed_executive,app.qc_completed_executive,app.in_date,app.in_time,app.end_date,app.status,app.tat_stop_date,app.tat_resume_date from `tabApplicant` app where
                app.in_date between %(start_date)s and %(end_date)s order by app.in_date""",{
                "start_date": filters.get("from_date"),
                "end_date": filters.get("to_date")
        }, as_dict = 1)
    return applicant


def get_conditions(filters):
    conditions = ""
    if filters.get("from_date"):
        conditions += " app.in_date >= %(from_date)s"
    if filters.get("to_date"):
        conditions += " and app.end_date >= %(to_date)s"

    return conditions, filters