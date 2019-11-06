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
    checks_group = get_checks_group(filters)
    for checks in checks_group:
        row = [checks.name,checks.customer]
        data.append(row)
        if checks.employment_check1 == 1:
            row += ["Employement Check1"]
        else:
            row += [""]
        if checks.employment_check2 == 1:
            row += ["Employement Check2"]
        else:
            row += [""]
        if checks.employment_check3 == 1:
            row += ["Employement Check3"]
        else:
            row += [""]
        if checks.employment_check4 == 1:
            row += ["Employement Check4"]
        else:
            row += [""]
        if checks.education_check1 == 1:
            row += ["Education Check1"]
        else:
            row += [""]
        if checks.education_check2 == 1:
            row += ["Education Check2"]
        else:
            row += [""]
        if checks.education_check3 == 1:
            row += ["Education Check3"]
        else:
            row += [""]
        if checks.education_check4 == 1:
            row += ["Education Check4"]
        else:
            row += [""]
        if checks.address_check1 == 1:
            row += ["Address Check1"]
        else:
            row += [""]
        if checks.address_check2 == 1:
            row += ["Address Check2"]
        else:
            row += [""]
        if checks.address_check3 == 1:
            row += ["Address Check3"]
        else:
            row += [""]
        if checks.address_check4 == 1:
            row += ["Address Check4"]
        else:
            row += [""]
        if checks.family_check1 == 1:
            row += ["Family Check1"]
        else:
            row += [""]
        if checks.family_check2 == 1:
            row += ["Family Check2"]
        else:
            row += [""]
        if checks.family_check3 == 1:
            row += ["Family Check3"]
        else:
            row += [""]
        if checks.family_check4 == 1:
            row += ["Family Check4"]
        else:
            row += [""]
        if checks.reference_check1 == 1:
            row += ["Reference Check1"]
        else:
            row += [""]
        if checks.reference_check2 == 1:
            row += ["Reference Check2"]
        else:
            row += [""]
        if checks.reference_check3 == 1:
            row += ["Reference Check3"]
        else:
            row += [""]
        if checks.reference_check4 == 1:
            row += ["Reference Check4"]
        else:
            row += [""]
        if checks.civil_check == 1:
            row += ["Civil Check"]
        else:
            row += [""]
        if checks.criminal_check == 1:
            row += ["Criminal Check"]
        else:
            row += [""]
        if checks.aadhar_card_verification == 1:
            row += ["Aadhar Card Verification"]
        else:
            row += [""]
        if checks.pan_verification == 1:
            row += ["Pan Verification"]
        else:
            row += [""]
        if checks.passport_verification == 1:
            row += ["Passport verification"]
        else:
            row += [""]
        if checks.ration_card_verification == 1:
            row += ["Ration Card Verification"]
        else:
            row += [""]
        if checks.voters_id_verification == 1:
            row += ["Voters ID verification"]
        else:
            row += [""]
        if checks.driving_license_verification == 1:
            row += ["Driving License Verification"]
        else:
            row += [""]
    return columns, data


def get_columns(filters):
    columns = [
        _("Checks Group") + ":Data:250",
        _("Customer") + ":Link/Customer:250",
        _("Employement Check1") + ":Data:150",
        _("Employement Check2") + ":Data:150",
        _("Employement Check3") + ":Data:150",
        _("Employement Check4") + ":Data:150",
        _("Education Check1") + ":Data:150",
        _("Education Check2") + ":Data:150",
        _("Education Check3") + ":Data:150",
        _("Education Check4") + ":Data:150",
        _("Address Check1") + ":Data:150",
        _("Address Check2") + ":Data:150",
        _("Address Check3") + ":Data:150",
        _("Address Check4") + ":Data:150",
        _("Family Check1") + ":Data:150",
        _("Family Check2") + ":Data:150",
        _("Family Check3") + ":Data:150",
        _("Family Check4") + ":Data:150",
        _("Reference Check1") + ":Data:150",
        _("Reference Check2") + ":Data:150",
        _("Reference Check3") + ":Data:150",
        _("Reference Check4") + ":Data:150",
        _("Civil Check") + ":Data:150",
        _("Criminal Check") + ":Data:150",
        _("Addhar Card verification") + ":Data:150",
        _("Pan Verification") + ":Data:150",
        _("Passport verification") + ":Data:150",
        _("Ration Card Verification") + ":Data:150",
        _("Voters ID verification") + ":Data:150",
        _("Driving License Verification") + ":Data:150",
    ]
    return columns



def get_checks_group(filters):
    checks_group = frappe.db.sql(
        """select  * from `tabChecks Group` cg where 
                cg.customer =  %(customer)s""",{
                "customer": filters.get("customer")
        }, as_dict = 1)
    return checks_group




def get_conditions(filters):
    conditions = ""
    if filters.get("customer"):
        conditions += " cg.customer >= %(customer)s"

    return conditions, filters