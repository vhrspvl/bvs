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
        row = [a.in_date,a.in_date,a.time,a.customer,a.executive,a.no_of_cases,a.cases_pending]
        data.append(row) 
    return columns, data


def get_columns():
    columns = [
        _("Case Received Date") + ":Date:150",
        _("Allocated Date") + ":Date:150",
        _("Allocated Time") + ":Time:150",
        _("Client Name") + ":Link/Customer:150",
        _("Allocated To") + ":Data:150",
		_("No.of Cases") + ":Int:150",
		_("Pending Cases") + ":Int:150",
    ]
    return columns

def applicants(filters):
    applicant = frappe.db.sql(
        """select `tabData Entry Allocation`.in_date,`tabData Entry Allocation`.time,`tabData Entry Allocation`.customer,`tabData Entry Allocation`.executive,`tabData Entry Allocation`.no_of_cases,`tabData Entry Allocation`.cases_pending from `tabData Entry Allocation` 
        where `tabData Entry Allocation`.in_date between %(start_date)s and %(end_date)s order by `tabData Entry Allocation`.in_date""",{
        "start_date": filters.get("from_date"),
        "end_date": filters.get("to_date")
        }, as_dict = 1)
    return applicant


