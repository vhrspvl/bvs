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
    	row = [app.customer,app.ref_id,app.candidate_name,app.in_date]
        data.append(row)
        if app.status == "QC Pending":
            row += ["Entry Completed",app.entry_completed_date,app.entry_completed_executive,"IQC Completed",app.iqc_completed_date,app.iqc_completed_executive,"Allocation Completed",app.allocation_completed_date,app.execution_completed_executive,app.status]
        if app.status == "Allocation Pending":
            row += ["Entry Completed",app.entry_completed_date,app.entry_completed_executive,"IQC Completed",app.iqc_completed_date,app.iqc_completed_executive,app.status]
        if app.status == "IQC Pending":
            row += ["Entry Completed",app.entry_completed_date,app.entry_completed_executive,app.status]
        if app.status == "Entry Pending":
            row += ["Entry Pending"]
        if app.status == "Allocation Completed":
            row += ["Entry Completed",app.entry_completed_date,app.entry_completed_executive,"IQC Completed",app.iqc_completed_date,app.iqc_completed_executive,"Allocation Completed",app.allocation_completed_date,app.execution_completed_executive]
        if app.status == "QC Completed":
            row += ["Entry Completed",app.entry_completed_date,app.entry_completed_executive,"IQC Completed",app.iqc_completed_date,app.iqc_completed_executive,"Allocation Completed",app.allocation_completed_date,app.execution_completed_executive,"QC Completed",app.qc_completed_date,app.qc_completed_executive]
        if app.status == "Positive" or app.status == "Negative" or app.status == "Amber":
            row += ["Entry Completed",app.entry_completed_date,app.entry_completed_executive,"IQC Completed",app.iqc_completed_date,app.iqc_completed_executive,"Allocation Completed",app.allocation_completed_date,app.execution_completed_executive,"QC Completed",app.qc_completed_date,app.qc_completed_executive,app.tat_stop_date,app.end_date]
        if app.status == "Insufficient":
            row += ["Entry Completed",app.entry_completed_date,app.entry_completed_executive,"IQC Completed",app.iqc_completed_date,app.iqc_completed_executive,"Allocation Completed",app.allocation_completed_date,app.execution_completed_executive,app.status,"","",app.tat_stop_date,app.end_date] 
    return columns, data


def get_columns():
    columns = [
        _("Project Name") + ":Link/Customer:200",
        _("VHRS Ref. No") + ":Data:150",
        _("Candidate Name") + ":Data:180",
        _("Start Date") + ":Date:150",
        _("DE Status") + ":Data:150",
        _("DE Completed Date") + ":Date:150",
        _("DE Completed Executive") + ":Link/User:150",
        _("IQC Status") + ":Data:150",
        _("IQC Completed Date") + ":Date:150",
        _("IQC Completed Executive") + ":Link/User:150",
        _("Execution Status") + ":Data:150",
        _("Execution Completed Date") + ":Date:150",
        _("Execution Completed Executive") + ":Link/User:150",
        _("Verification Status") + ":Data:150",
        _("Verification Completed Date") + ":Date:150",
        _("Verification Completed Executive") + ":Link/User:150",
        _("insuff Raised Date") + ":Date:150",
        _("Report Generated Date") + ":Date:150"
    ]
    return columns



def applicants(filters):
    applicant = frappe.db.sql(
        """select app.customer,app.ref_id,app.candidate_name,app.in_date,app.status,app.entry_completed_date,app.iqc_completed_date,app.allocation_completed_date,app.qc_completed_date,
        app.tat_stop_date,app.end_date,app.entry_completed_executive,app.iqc_completed_executive,execution_completed_executive,qc_completed_executive from `tabApplicant` app where
        app.in_date between %(start_date)s and %(end_date)s order by app.in_date""",{
                "start_date": filters.get("from_date"),
                "end_date": filters.get("to_date")
        }, as_dict = 1)    
    return applicant