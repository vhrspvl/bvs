# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe,json
from frappe.model.document import Document

class AllocateChecks(Document):
	pass

@frappe.whitelist()
def get_check(check):
	if check == "Verify Employment Check":
		check1 = frappe.get_list("Verify Employment Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Verify Employment Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Verify Employment Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Verify Employment Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Address Check":
		check1 = frappe.get_list("Address Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Address Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Address Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Address Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Verify Address Check":
		check1 = frappe.get_list("Verify Address Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Verify Address Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Verify Address Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Verify Address Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Education Check":
		check1 = frappe.get_list("Education Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Education Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Education Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Education Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Verify Education Check":
		check1 = frappe.get_list("Verify Education Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Verify Education Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Verify Education Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Verify Education Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Employment Check":
		check1 = frappe.get_list("Employment Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Employment Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Employment Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Employment Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Family Check":
		check1 = frappe.get_list("Family Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Family Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Family Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Family Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Verify Family Check":
		check1 = frappe.get_list("Verify Family Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Verify Family Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Verify Family Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Verify Family Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Reference Check":
		check1 = frappe.get_list("Reference Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Reference Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Reference Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Reference Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Verify Reference Check":
		check1 = frappe.get_list("Verify Reference Check1", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Verify Reference Check2", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Verify Reference Check3", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Verify Reference Check4", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4
	elif check == "Civil Check":
		pending_checks = frappe.get_list("Civil Check", fields =("applicant_id","name","status"))
	elif check == "Criminal Check":		
		pending_checks = frappe.get_list("Verify Criminal Check", fields =("applicant_id","name","status"))
	elif check == "Verify Civil Check":
		pending_checks = frappe.get_list("Verify Civil Check", fields =("applicant_id","name","status"))
	elif check == "Verify Criminal Check":		
		pending_checks = frappe.get_list("Verify Criminal Check", fields =("applicant_id","name","status"))
	elif check == "Identity Check":
		check1 = frappe.get_list("Aadhar Card Verification", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Voters ID Verification", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Pan Verification", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Ration Card Verification", fields =("applicant_id","name","status"))
		check5 = frappe.get_list("Passport Verification", fields =("applicant_id","name","status"))
		check6 = frappe.get_list("Driving License Verification", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4+check5+check6
	elif check == "Verify Identity Check":
		check1 = frappe.get_list("Verify Aadhar Card Verification", fields =("applicant_id","name","status"))
		check2 = frappe.get_list("Verify Voters ID Verification", fields =("applicant_id","name","status"))
		check3 = frappe.get_list("Verify Pan Verification", fields =("applicant_id","name","status"))
		check4 = frappe.get_list("Verify Ration Card Verification", fields =("applicant_id","name","status"))
		check5 = frappe.get_list("Verify Passport Verification", fields =("applicant_id","name","status"))
		check6 = frappe.get_list("Verify Driving License Verification", fields =("applicant_id","name","status"))
		pending_checks = check1+check2+check3+check4+check5+check6
        return pending_checks


@frappe.whitelist()
def status_filter(status,check):
	if check == "Employment Check":
		if status == "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
			check1 = frappe.get_list("Employment Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Employment Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Employment Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Employment Check4", fields =("applicant_id","name","status"))
			status = check1+check2+check3+check4
			return status
	elif check == "Address Check":
		if status == "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
			check1 = frappe.get_list("Address Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Address Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Address Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Address Check4", fields =("applicant_id","name","status"))
			status = check1+check2+check3+check4
			return status
	elif check == "Education Check":
		if status == "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
			check1 = frappe.get_list("Education Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Education Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Education Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Education Check4", fields =("applicant_id","name","status"))
			pending_checks = check1+check2+check3+check4
			return status
	elif check == "Reference Check":
		if status == "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
			check1 = frappe.get_list("Reference Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Reference Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Reference Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Reference Check4", fields =("applicant_id","name","status"))
			pending_checks = check1+check2+check3+check4
			return status
	elif check == "Family Check":
		if status == "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
			check1 = frappe.get_list("Family Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Family Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Family Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Family Check4", fields =("applicant_id","name","status"))
			pending_checks = check1+check2+check3+check4
			return status
	elif check == "Identity Check":
		if status == "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
			check1 = frappe.get_list("Aadhar Card Verification", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Voters ID Verification", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Pan Verification", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Ration Card Verification", fields =("applicant_id","name","status"))
			check5 = frappe.get_list("Passport Verification", fields =("applicant_id","name","status"))
			check6 = frappe.get_list("Driving License Verification", fields =("applicant_id","name","status"))
			status = check1+check2+check3+check4+check5+check6
			return status
	elif check == "Civil Check":
		if status == "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
			check = frappe.get_list("Civil Check", fields =("applicant_id","name","status"))
			status == check
			return status
	elif check == "Criminal Check":
		if status == "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
			check = frappe.get_list("Criminal Check", fields =("applicant_id","name","status"))
			status == check
			return status
	if check == "Verify Employment Check":
		if status == "Insufficient" or "Pending":
			check1 = frappe.get_list("Verify Employment Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Verify Employment Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Verify Employment Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Verify Employment Check4", fields =("applicant_id","name","status"))
			status = check1+check2+check3+check4
			return status
	elif check == "Verify Address Check":
		if status == "Insufficient" or "Pending":
			check1 = frappe.get_list("Verify Address Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Verify Address Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Verify Address Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Verify Address Check4", fields =("applicant_id","name","status"))
			status = check1+check2+check3+check4
			return status
	elif check == "Verify Education Check":
		if status == "Insufficient" or "Pending":
			check1 = frappe.get_list("Verify Education Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("verify Education Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("verify Education Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Verify Education Check4", fields =("applicant_id","name","status"))
			pending_checks = check1+check2+check3+check4
			return status
	elif check == "Verify Reference Check":
		if status == "Insufficient" or "Pending":
			check1 = frappe.get_list("Verify Reference Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Verify Reference Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Verify Reference Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Verify Reference Check4", fields =("applicant_id","name","status"))
			pending_checks = check1+check2+check3+check4
			return status
	elif check == "Verify Family Check":
		if status == "Insufficient" or "Pending":
			check1 = frappe.get_list("Verify Family Check1", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Verify Family Check2", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Verify Family Check3", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Verify Family Check4", fields =("applicant_id","name","status"))
			pending_checks = check1+check2+check3+check4
			return status
	elif check == "Verify Identity Check":
		if status == "Insufficient" or "Pending":
			check1 = frappe.get_list("Verify Aadhar Card Verification", fields =("applicant_id","name","status"))
			check2 = frappe.get_list("Verify Voters ID Verification", fields =("applicant_id","name","status"))
			check3 = frappe.get_list("Verify Pan Verification", fields =("applicant_id","name","status"))
			check4 = frappe.get_list("Verify Ration Card Verification", fields =("applicant_id","name","status"))
			check5 = frappe.get_list("Verify Passport Verification", fields =("applicant_id","name","status"))
			check6 = frappe.get_list("Verify Driving License Verification", fields =("applicant_id","name","status"))
			status = check1+check2+check3+check4+check5+check6
			return status
	elif check == "Verify Civil Check":
		if status == "Insufficient" or "Pending":
			check = frappe.get_list("Verify Civil Check", fields =("applicant_id","name","status"))
			status == check
			return status
	elif check == "Verify Criminal Check":
		if status == "Insufficient" or "Pending":
			check = frappe.get_list("Verify Criminal Check", fields =("applicant_id","name","status"))
			status == check
			return status




@frappe.whitelist()
def set_assign_to(checks_executive):
	if checks_executive:
        # frappe.desk.form.assign_to.add(args = { "allocated_to": , "DocType": , "reference_doctype": , "a": })
		frappe.errprint(checks_executive)




