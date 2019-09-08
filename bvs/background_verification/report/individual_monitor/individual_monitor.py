# Copyright (c) 2013, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _, msgprint
from frappe.utils import (cint, cstr, date_diff, flt, getdate, money_in_words,
                          nowdate, rounded, today)
from datetime import datetime
from datetime import date
from calendar import monthrange

def execute(filters=None):
    columns = get_columns()
    data = []
    row1 = []
    row2 = []
    row3 = []
    row4 = []
    row5 = []
    row6 = []
    row7 = []
    row8 = []
    row9 = []
    row10 = []
    row11 = []
    row12 = []
    row13 = []
    row14 = []
    row15 = []
    row16 = []
    row17 = []
    row18 = []
    row19 = []
    row20 = []
    row21 = []
    row22 = []
    row23 = []
    row24 = []
    row25 = []
    row26 = []
    row27 = []
    row28 = []

    for emp in verify_employee1_details():
        row1 = [emp.executive,emp.customer,"Verify Employment Check1",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row1)
        if not emp.end_date:
            today_date = date.today()
            # row1 += [today_date - emp.in_date]
        # else:
            # row1 += [emp.end_date - emp.in_date]
    for emp in verify_employee2_details():
        row2 = [emp.executive,emp.customer,"Verify Employment Check2",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row2)
        if not emp.end_date:
            today_date = date.today()
            # row2 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_employee3_details():
        row3 = [emp.executive,emp.customer,"Verify Employment Check3",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row3)
        if not emp.end_date:
            today_date = date.today()
            # row3 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_employee4_details():
        row4 = [emp.executive,emp.customer,"Verify Employment Check4",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row4)
        if not emp.end_date:
            today_date = date.today()
            # row4 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_education1_details():
        row5 = [emp.executive,emp.customer,"Verify Education Check1",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row5)
        if not emp.end_date:
            today_date = date.today()
            # row5 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_education2_details():
        row6 = [emp.executive,emp.customer,"Verify Education Check2",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row6)
        if not emp.end_date:
            today_date = date.today()
            # row6 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_education3_details():
        row7 = [emp.executive,emp.customer,"Verify Education Check3",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row7)
        if not emp.end_date:
            today_date = date.today()
            # row7 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_education4_details():
        row8 = [emp.executive,emp.customer,"Verify Education Check4",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row8)
        if not emp.end_date:
            today_date = date.today()
            # row8 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_address1_details():
        row9 = [emp.executive,emp.customer,"Verify Address Check1",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row9)
        if not emp.end_date:
            today_date = date.today()
            # row9 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_address2_details():
        row10 = [emp.executive,emp.customer,"Verify Address Check2",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row10)
        if not emp.end_date:
            today_date = date.today()
            # row10 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_address3_details():
        row11 = [emp.executive,emp.customer,"Verify Address Check3",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row11)
        if not emp.end_date:
            today_date = date.today()
            # row11 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_address4_details():
        row12 = [emp.executive,emp.customer,"Verify Address Check4",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row12)
        if not emp.end_date:
            today_date = date.today()
            # row12 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_reference1_details():
        row13 = [emp.executive,emp.customer,"Verify Reference Check1",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row13)
        if not emp.end_date:
            today_date = date.today()
            # row13 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_reference2_details():
        row14 = [emp.executive,emp.customer,"Verify Reference Check2",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row14)
        if not emp.end_date:
            today_date = date.today()
            # row14 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_reference3_details():
        row15 = [emp.executive,emp.customer,"Verify Reference Check3",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row15)
        if not emp.end_date:
            today_date = date.today()
            # row15 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_reference4_details():
        row16 = [emp.executive,emp.customer,"Verify Reference Check4",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row16)
        if not emp.end_date:
            today_date = date.today()
            # row16 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_family1_details():
        row17 = [emp.executive,emp.customer,"Verify Family Check1",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row17)
        if not emp.end_date:
            today_date = date.today()
            # row17 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_family2_details():
        row18 = [emp.executive,emp.customer,"Verify Family Check2",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row18)
        if not emp.end_date:
            today_date = date.today()
            # row18 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_family3_details():
        row19 = [emp.executive,emp.customer,"Verify Family Check3",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row19)
        if not emp.end_date:
            today_date = date.today()
            # row19 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_family4_details():
        row20 = [emp.executive,emp.customer,"Verify Family Check4",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row20)
        if not emp.end_date:
            today_date = date.today()
            # row20 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_civil_details():
        row21 = [emp.executive,emp.customer,"Verify Civil Check",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row21)
        if not emp.end_date:
            today_date = date.today()
            # row21 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_criminal_details():
        row22 = [emp.executive,emp.customer,"Verify Criminal Check",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row22)
        if not emp.end_date:
            today_date = date.today()
            # row22 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_aadhar_details():
        row23 = [emp.executive,emp.customer,"Verify Aadhar Card  Verification",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row23)
        if not emp.end_date:
            today_date = date.today()
            # row23 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_pan_details():
        row24 = [emp.executive,emp.customer,"Verify Pan Verification",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row24)
        if not emp.end_date:
            today_date = date.today()
            # row24 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_passport_details():
        row25 = [emp.executive,emp.customer,"Verify Passport Verification",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row25)
        if not emp.end_date:
            today_date = date.today()
            # row25 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_voters_id_details():
        row26 = [emp.executive,emp.customer,"Verify Voters ID Verification",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row26)
        if not emp.end_date:
            today_date = date.today()
            # row26 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_ration_card_details():
        row27 = [emp.executive,emp.customer,"Verify Ration Card Verification",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row27)
        if not emp.end_date:
            today_date = date.today()
            # row27 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    for emp in verify_driving_license_details():
        row28 = [emp.executive,emp.customer,"Verify Driving License Verification",emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date]
        data.append(row28)
        if not emp.end_date:
            today_date = date.today()
            # row28 += [today_date - emp.in_date]
        # else:
            # row += [emp.end_date - emp.in_date]
    return columns,data




def get_columns():
    columns = [
        _("SPOC name") + ":Link/User:200",
        _("Project") + ":Link/Customer:150",
        _("Check Type") + ":Data:180",
        _("VHRS Reference Number") + ":Data:180",
        _("Candidate Name") + ":Data:180",
        _("Start Date") + ":Date:150",
        _("Assigned Date") + ":Date:150",
        _("Completed Date") + ":Date:150",
        _("Age") + ":Int:150"
    ]
    return columns



def verify_employee1_details():
    vemp1 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Employment Check1` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vemp1

def verify_employee2_details():
    vemp2 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Employment Check2` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vemp2

def verify_employee3_details():
    vemp3 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Employment Check3` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vemp3

def verify_employee4_details():
    vemp4 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Employment Check4` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vemp4

def verify_education1_details():
    vedu1 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Education Check1` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu1

def verify_education2_details():
    vedu2 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Education Check2` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu2

def verify_education3_details():
    vedu3 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Education Check3` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu3

def verify_education4_details():
    vedu4 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Education Check4` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu4

def verify_address1_details():
    vedu1 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Address Check1` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu1

def verify_address2_details():
    vedu2 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Address Check2` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu2

def verify_address3_details():
    vedu3 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Address Check3` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu3

def verify_address4_details():
    vedu4 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Address Check4` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu4

def verify_reference1_details():
    vedu1 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Reference Check1` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu1

def verify_reference2_details():
    vedu2 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Reference Check2` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu2

def verify_reference3_details():
    vedu3 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Reference Check3` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu3

def verify_reference4_details():
    vedu4 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Reference Check4` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu4


def verify_family1_details():
    vedu1 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Family Check1` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu1

def verify_family2_details():
    vedu2 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Family Check2` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu2

def verify_family3_details():
    vedu3 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Family Check3` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu3

def verify_family4_details():
    vedu4 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Family Check4` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu4

def verify_civil_details():
    vedu1 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Civil Check` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu1

def verify_criminal_details():
    vedu2 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Criminal Check` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu2

def verify_aadhar_details():
    vedu3 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Aadhar Card Verification` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu3

def verify_pan_details():
    vedu4 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Pan Verification` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu4

def verify_passport_details():
    vedu1 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Passport Verification` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu1

def verify_voters_id_details():
    vedu2 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Voters ID Verification` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu2

def verify_ration_card_details():
    vedu3 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Ration Card Verification` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu3

def verify_driving_license_details():
    vedu4 = frappe.db.sql(
        """select emp.executive,emp.customer,emp.applicant_id,emp.applicant_name,emp.in_date,emp.assigned_date,emp.end_date from `tabVerify Driving License Verification` emp where emp.status = "Execution Completed" order by emp.customer""", as_dict=1)
    return vedu4