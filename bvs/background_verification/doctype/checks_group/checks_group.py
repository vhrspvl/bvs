# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ChecksGroup(Document):
	pass



@frappe.whitelist()
def get_status(applicant,checks_group):
    entry_check = ["employment_check1","employment_check2","employment_check3","employment_check4","education_check1","education_check2","education_check3","education_check4",
    "address_check1","address_check2","address_check3","address_check4","family_check1","family_check2","family_check3","family_check4","reference_check1","reference_check2","reference_check3","reference_check4",
    "aadhar_card_verification","pan_verification","passport_verification","voters_id_verification","ration_card_verification","driving_license_verification","civil_check","criminal_check","neighbourhood_check"]
    status = "Entry Pending"
    applicant_cg = frappe.get_all("Checks Group", ["*"], {"name":checks_group})
    for a in applicant_cg:
        checks = []
        for i in entry_check:
            if a.get(i) == 1:
                if i == "employment_check1":
                   checks.append("Employment Check1")
                if i == "employment_check2":
                   checks.append("Employment Check2")
                if i == "employment_check3":
                   checks.append("Employment Check3")
                if i == "employment_check4":
                   checks.append("Employment Check4")
                if i == "education_check1":
                   checks.append("Education Check1")
                if i == "education_check2":
                   checks.append("Education Check2")
                if i == "education_check3":
                   checks.append("Education Check3")
                if i == "education_check4":
                   checks.append("Education Check4")
                if i == "address_check1":
                   checks.append("Address Check1")
                if i == "address_check2":
                   checks.append("Address Check2")
                if i == "address_check3":
                   checks.append("Address Check3")
                if i == "address_check4":
                   checks.append("Address Check4")
                if i == "family_check1":
                   checks.append("Family Check1")
                if i == "family_check2":
                   checks.append("Family Check2")
                if i == "family_check3":
                   checks.append("Family Check3")
                if i == "family_check4":
                   checks.append("Family Check4")
                if i == "reference_check1":
                   checks.append("Reference Check1")
                if i == "reference_check2":
                   checks.append("Reference Check2")
                if i == "reference_check3":
                   checks.append("Reference Check3")
                if i == "reference_check4":
                   checks.append("Reference Check4")
                if i == "aadhar_card_verification":
                   checks.append("Aadhar Card Verification")
                if i == "pan_verification":
                   checks.append("Pan Verification")
                if i == "passport_verification":
                   checks.append("Passport Verification")
                if i == "voters_id_verification":
                   checks.append("Voters ID Verification")
                if i == "ration_card_verification":
                   checks.append("Ration Card Verification")
                if i == "driving_license_verification":
                   checks.append("Driving License Verification")
                if i == "civil_check":
                   checks.append("Civil Check")
                if i == "criminal_check":
                   checks.append("Criminal Check")
                if i == "neighbourhood_check":
                    checks.append("Neighbourhood Check")
        status_list = []
        for e in checks:
            status1 = frappe.db.get_value(e, {"applicant_id": applicant}, "status")
            if status1 != "Allocation Completed":
                if e == "Employment Check1":
                    status_list.append(frappe._dict({                    
                        "check": "employment_check1",
                        "status": status1
                    }))
                if e == "Employment Check2":
                    status_list.append(frappe._dict({                    
                        "check": "employment_check2",
                        "status": status1
                    }))
                if e == "Employment Check3":
                    status_list.append(frappe._dict({                    
                        "check": "employment_check3",
                        "status": status1
                    }))
                if e == "Employment Check4":
                    status_list.append(frappe._dict({                    
                        "check": "employment_check4",
                        "status": status1
                    }))
                if e == "Education Check1":
                    status_list.append(frappe._dict({                    
                        "check": "education_check1",
                        "status": status1
                    }))
                if e == "Education Check2":
                    status_list.append(frappe._dict({                    
                        "check": "education_check2",
                        "status": status1
                    }))
                if e == "Education Check3":
                    status_list.append(frappe._dict({                    
                        "check": "education_check3",
                        "status": status1
                    }))
                if e == "Education Check4":
                    status_list.append(frappe._dict({                    
                        "check": "education_check4",
                        "status": status1
                    }))
                if e == "Address Check1":
                    status_list.append(frappe._dict({                    
                        "check": "address_check1",
                        "status": status1
                    }))
                if e == "Address Check2":
                    status_list.append(frappe._dict({                    
                        "check": "address_check2",
                        "status": status1
                    }))
                if e == "Address Check3":
                    status_list.append(frappe._dict({                    
                        "check": "address_check3",
                        "status": status1
                    }))
                if e == "Address Check4":
                    status_list.append(frappe._dict({                    
                        "check": "address_check4",
                        "status": status1
                    }))
                if e == "Family Check1":
                    status_list.append(frappe._dict({                    
                        "check": "family_check1",
                        "status": status1
                    }))
                if e == "Family Check2":
                    status_list.append(frappe._dict({                    
                        "check": "family_check2",
                        "status": status1
                    }))
                if e == "Family Check3":
                    status_list.append(frappe._dict({                    
                        "check": "family_check3",
                        "status": status1
                    }))
                if e == "Family Check4":
                    status_list.append(frappe._dict({                    
                        "check": "family_check4",
                        "status": status1
                    }))
                if e == "Reference Check1":
                    status_list.append(frappe._dict({                    
                        "check": "reference_check1",
                        "status": status1
                    }))
                if e == "Reference Check2":
                    status_list.append(frappe._dict({                    
                        "check": "reference_check2",
                        "status": status1
                    }))
                if e == "Reference Check3":
                    status_list.append(frappe._dict({                    
                        "check": "reference_check3",
                        "status": status1
                    }))
                if e == "Reference Check4":
                    status_list.append(frappe._dict({                    
                        "check": "reference_check4",
                        "status": status1
                    }))
                if e == "Civil Check":
                    status_list.append(frappe._dict({                    
                        "check": "civil_check",
                        "status": status1
                    }))
                if e == "Criminal Check":
                    status_list.append(frappe._dict({                    
                        "check": "criminal_check",
                        "status": status1
                    }))
                if e == "Aadhar Card Verification":
                    status_list.append(frappe._dict({                    
                        "check": "aadhar_card_verification",
                        "status": status1
                    }))
                if e == "Pan Verification":
                    status_list.append(frappe._dict({                    
                        "check": "pan_verification",
                        "status": status1
                    }))
                if e == "Passport Verification":
                    status_list.append(frappe._dict({                    
                        "check": "paaport_verification",
                        "status": status1
                    }))
                if e == "Voters ID Verification":
                    status_list.append(frappe._dict({                    
                        "check": "voters_id_verification",
                        "status": status1
                    }))
                if e == "Ration Card Verification":
                    status_list.append(frappe._dict({                    
                        "check": "ration_card_verification",
                        "status": status1
                    }))
                if e == "Driving License Verification":
                    status_list.append(frappe._dict({                    
                        "check": "driving_license_verification",
                        "status": status1
                    }))
                if e == "Neighbourhood Check":
                    status_list.append(frappe._dict({                    
                        "check": "neighbourhood_check",
                        "status": status1
                    }))
            else:
                status2 = frappe.db.get_value("Verify "+e, {"applicant_id": applicant}, "status")
                if e == "Employment Check1":
                    status_list.append(frappe._dict({                    
                        "check": "employment_check1",
                        "status": status2
                    }))
                if e == "Employment Check2":
                    status_list.append(frappe._dict({                    
                        "check": "employment_check2",
                        "status": status2
                    }))
                if e == "Employment Check3":
                    status_list.append(frappe._dict({                    
                        "check": "employment_check3",
                        "status": status2
                    }))
                if e == "Employment Check4":
                    status_list.append(frappe._dict({                    
                        "check": "employment_check4",
                        "status": status2
                    }))
                if e == "Education Check1":
                    status_list.append(frappe._dict({                    
                        "check": "education_check1",
                        "status": status2
                    }))
                if e == "Education Check2":
                    status_list.append(frappe._dict({                    
                        "check": "education_check2",
                        "status": status2
                    }))
                if e == "Education Check3":
                    status_list.append(frappe._dict({                    
                        "check": "education_check3",
                        "status": status2
                    }))
                if e == "Education Check4":
                    status_list.append(frappe._dict({                    
                        "check": "education_check4",
                        "status": status2
                    }))
                if e == "Address Check1":
                    status_list.append(frappe._dict({                    
                        "check": "address_check1",
                        "status": status2
                    }))
                if e == "Address Check2":
                    status_list.append(frappe._dict({                    
                        "check": "address_check2",
                        "status": status2
                    }))
                if e == "Address Check3":
                    status_list.append(frappe._dict({                    
                        "check": "address_check3",
                        "status": status2
                    }))
                if e == "Address Check4":
                    status_list.append(frappe._dict({                    
                        "check": "address_check4",
                        "status": status2
                    }))
                if e == "Family Check1":
                    status_list.append(frappe._dict({                    
                        "check": "family_check1",
                        "status": status2
                    }))
                if e == "Family Check2":
                    status_list.append(frappe._dict({                    
                        "check": "family_check2",
                        "status": status2
                    }))
                if e == "Family Check3":
                    status_list.append(frappe._dict({                    
                        "check": "family_check3",
                        "status": status2
                    }))
                if e == "Family Check4":
                    status_list.append(frappe._dict({                    
                        "check": "family_check4",
                        "status": status2
                    }))
                if e == "Reference Check1":
                    status_list.append(frappe._dict({                    
                        "check": "reference_check1",
                        "status": status2
                    }))
                if e == "Reference Check2":
                    status_list.append(frappe._dict({                    
                        "check": "reference_check2",
                        "status": status2
                    }))
                if e == "Reference Check3":
                    status_list.append(frappe._dict({                    
                        "check": "reference_check3",
                        "status": status2
                    }))
                if e == "Reference Check4":
                    status_list.append(frappe._dict({                    
                        "check": "reference_check4",
                        "status": status2
                    }))
                if e == "Civil Check":
                    status_list.append(frappe._dict({                    
                        "check": "civil_check",
                        "status": status2
                    }))
                if e == "Criminal Check":
                    status_list.append(frappe._dict({                    
                        "check": "criminal_check",
                        "status": status2
                    }))
                if e == "Aadhar Card Verification":
                    status_list.append(frappe._dict({                    
                        "check": "aadhar_card_verification",
                        "status": status2
                    }))
                if e == "Pan Verification":
                    status_list.append(frappe._dict({                    
                        "check": "pan_verification",
                        "status": status2
                    }))
                if e == "Passport Verification":
                    status_list.append(frappe._dict({                    
                        "check": "paaport_verification",
                        "status": status2
                    }))
                if e == "Voters ID Verification":
                    status_list.append(frappe._dict({                    
                        "check": "voters_id_verification",
                        "status": status2
                    }))
                if e == "Ration Card Verification":
                    status_list.append(frappe._dict({                    
                        "check": "ration_card_verification",
                        "status": status2
                    }))
                if e == "Driving License Verification":
                    status_list.append(frappe._dict({                    
                        "check": "driving_license_verification",
                        "status": status2
                    }))
                if e == "Neighbourhood Check":
                    status_list.append(frappe._dict({                    
                        "check": "neighbourhood_check",
                        "status": status2
                    }))
        return status_list   