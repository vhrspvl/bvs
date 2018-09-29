from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
        {
			"label": _("Applicant and Checks Group"),
			"items": [
				{
					"type": "doctype",
					"name": "Checks Group",
					"description":_("Checks records"),
				},
				{
					"type": "doctype",
					"name": "Add Applicant",
					"description": _("Applicant records."),
				},
				{
					"type": "doctype",
					"name": "Bulk Excel Upload",
					"description": _("Bulk Excel Upload records"),
				},
				{
					"type": "doctype",
					"name": "Applicant",
					"description": _("Applicant records"),
				},
				{
					"type": "doctype",
					"name": "Demographic Data With Attachment",
					"description":_("Demographic Data With Attachment records"),
				},
				{
					"type": "doctype",
					"name": "Allocate Checks",
					"description":_("Checks Assigned to Executives"),
				},
				{
					"type": "doctype",
					"name": "Data Entry Allocation",
					"description":_("Data Entry Allocation records"),
				},
				{
					"type": "doctype",
					"name": "Entry Dashboard",
					"description":_("Entry Dashboard Records"),
				},
				{
					"type": "doctype",
					"name": "Verifier Dashboard",
					"description":_("Verify Dashboard Records"),
					"hide_count": True
				},
			]
		},
        {
			"label": _("Employment Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Employment Check1",
					"description": _("Employment records."),
				},
				{
					"type": "doctype",
					"name": "Employment Check2",
					"description":_("Employment records"),
				},
				{
					"type": "doctype",
					"name": "Employment Check3",
					"description": _("Employment records"),
				},
				{
					"type": "doctype",
					"name": "Employment Check4",
					"description":_("Employment records"),
					"hide_count": True
				},
			]
		},
        {
			"label": _("Verify Employment Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Verify Employment Check1",
					"description": _("Employment records."),
				},
				{
					"type": "doctype",
					"name": "Verify Employment Check2",
					"description":_("Employment records"),
				},
				{
					"type": "doctype",
					"name": "Verify Employment Check3",
					"description": _("Employment records"),
				},
				{
					"type": "doctype",
					"name": "Verify Employment Check4",
					"description": _("Employment records"),
				},
			]
		},
		{
			"label": _("Address Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Address Check1",
					"description": _("Address records."),
				},
				{
					"type": "doctype",
					"name": "Address Check2",
					"description":_("Address records"),
				},
				{
					"type": "doctype",
					"name": "Address Check3",
					"description": _("Address records"),
				},
				{
					"type": "doctype",
					"name": "Address Check4",
					"description":_("Address records"),
					"hide_count": True
				},
			]
		},
		{
			"label": _("Verify Address Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Verify Address Check1",
					"description": _("Verify Address records."),
				},
				{
					"type": "doctype",
					"name": "Verify Address Check2",
					"description":_("Verify Address records"),
				},
				{
					"type": "doctype",
					"name": "Verify Address Check3",
					"description": _("Address records"),
				},
				{
					"type": "doctype",
					"name": "Verify Address Check4",
					"description":_("Verify Address records"),
					"hide_count": True
				},
			]
		},
        {
			"label": _("Education Check"),
			"items": [
				{
					"type": "doctype",
					"name": "Education Check1",
					"description": _("Education records."),
				},
				{
					"type": "doctype",
					"name": "Education Check2",
					"description":_("Education records"),
				},
				{
					"type": "doctype",
					"name": "Education Check3",
					"description": _("Education records"),
				},
				{
					"type": "doctype",
					"name": "Education Check4",
					"description":_("Education records"),
					"hide_count": True
				},
			]
		},
        {
			"label": _("verify Education Check"),
			"items": [
				{
					"type": "doctype",
					"name": "Verify Education Check1",
					"description": _("Verify Education records."),
				},
				{
					"type": "doctype",
					"name": "Verify Education Check2",
					"description":_("Verify Education records"),
				},
				{
					"type": "doctype",
					"name": "Verify Education Check3",
					"description": _("Verify Education records"),
				},
				{
					"type": "doctype",
					"name": "Verify Education Check4",
					"description":_("Verify Education records"),
					"hide_count": True
				},
			]
		},
        {
			"label": _("Reference Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Reference Check1",
					"description": _("Reference Check1 records."),
				},
				{
					"type": "doctype",
					"name": "Reference Check2",
					"description":_("Reference Check2 records"),
				},
				{
					"type": "doctype",
					"name": "Reference Check3",
					"description": _("Reference Check3 records"),
				},
				{
					"type": "doctype",
					"name": "Reference Check4",
					"description":_("Reference Check4 records"),
					"hide_count": True
				},
			]
		},
        {
			"label": _("Verify Reference Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Verify Reference Check1",
					"description": _("Verify Reference Check1 records."),
				},
				{
					"type": "doctype",
					"name": "Verify Reference Check2",
					"description":_("Verify Reference Check2 records"),
				},
				{
					"type": "doctype",
					"name": "Verify Reference Check3",
					"description": _("Verify Reference Check3 records"),
				},
				{
					"type": "doctype",
					"name": "Verify Reference Check4",
					"description":_("Verify Reference Check4 records"),
					"hide_count": True
				},
			]
		},
        {
			"label": _("Family Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Family Check1",
					"description": _("Family Check1 records."),
				},
				{
					"type": "doctype",
					"name": "Family Check2",
					"description":_("Family Check2 records"),
				},
				{
					"type": "doctype",
					"name": "Family Check3",
					"description": _("Family Check3 records"),
				},
				{
					"type": "doctype",
					"name": "Family Check4",
					"description":_("Family Check4 records"),
					"hide_count": True
				},
			]
		},
		{
			"label": _("Verify Family Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Verify Family Check1",
					"description": _("Family Check1 records."),
				},
				{
					"type": "doctype",
					"name": "Verify Family Check2",
					"description":_("Verify Family Check2 records"),
				},
				{
					"type": "doctype",
					"name": "Verify Family Check3",
					"description": _("Family Check3 records"),
				},
				{
					"type": "doctype",
					"name": "Verify Family Check4",
					"description":_("Verify Family Check4 records"),
					"hide_count": True
				},
			]
		},
        {
			"label": _("Identity Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Aadhar Card Verification",
					"description": _("Identity Check1 records."),
				},
				{
					"type": "doctype",
					"name": "Pan Verification",
					"description":_("Identity Check2 records"),
				},
				{
					"type": "doctype",
					"name": "Passport Verification",
					"description": _("Identity Check3 records"),
				},
				{
					"type": "doctype",
					"name": "Voters ID Verification",
					"description":_("Identity Check4 records"),
					"hide_count": True
				},
				{
					"type": "doctype",
					"name": "Ration Card Verification",
					"description":_("Identity Check2 records"),
				},
				{
					"type": "doctype",
					"name": "Driving License Verification",
					"description": _("Identity Check3 records"),
				},
			]
		},        
        {
			"label": _("Verify Identity Checks"),
			"items": [
				{
					"type": "doctype",
					"name": "Verify Aadhar Card Verification",
					"description": _("Identity Check1 records."),
				},
				{
					"type": "doctype",
					"name": "Verify Pan Verification",
					"description":_("Identity Check2 records"),
				},
				{
					"type": "doctype",
					"name": "Verify Passport Verification",
					"description": _("Identity Check3 records"),
				},
				{
					"type": "doctype",
					"name": "Verify Voters ID Verification",
					"description":_("Identity Check4 records"),
				},
				{
					"type": "doctype",
					"name": "Verify Ration Card Verification",
					"description":_("Identity Check2 records"),
				},
				{
					"type": "doctype",
					"name": "Verify Driving License Verification",
					"description": _("Identity Check3 records"),
				},
			]
		}, 
        {
			"label": _("Civil Check"),
			"items": [
				{
					"type": "doctype",
					"name": "Civil Check",
					"description": _("Civil records."),
				},
			]
		},
        {
			"label": _("Verify Civil Check"),
			"items": [
				{
					"type": "doctype",
					"name": "Verify Civil Check",
					"description": _("Verify Civil records."),
				},
			]
		},
        {
			"label": _("Criminal Check"),
			"items": [
				{
					"type": "doctype",
					"name": "Criminal Check",
					"description": _("Criminal records."),
				},
			]
		},
        {
			"label": _("Verify Criminal Check"),
			"items": [
				{
					"type": "doctype",
					"name": "Verify Criminal Check",
					"description": _("Verify Criminal records."),
				},
			]
		}
	]