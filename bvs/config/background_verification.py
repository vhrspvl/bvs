from __future__ import unicode_literals
from frappe import _
import frappe


def get_data():
    system_manager = frappe.get_doc("User", frappe.session.user).get(
        "roles", {"role": "System Manager"})
    bvs_manager = frappe.get_doc("User", frappe.session.user).get(
        "roles", {"role": "BVS Manager"})
    bvs_verifier = frappe.get_doc("User", frappe.session.user).get(
        "roles", {"role": "BVS Verifier"})
    bvs_deo = frappe.get_doc("User", frappe.session.user).get(
        "roles", {"role": "BVS DEO"})
    if system_manager:
        return [
            {
                "label": _("Applicant and Checks Group"),
                "items": [
                    {
                        "type": "doctype",
                        "name": "Checks Group",
                        "description": _("Checks records"),
                    },
                    {
                        "type": "doctype",
                        "name": "BG Profile",
                        "description": _("Checks records"),
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
                        "description": _("Demographic Data With Attachment records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Allocate Checks",
                        "description": _("Checks Assigned to Executives"),
                        "BVS DEO": 0,
                        "BVS Verifier": 1,
                    },
                    {
                        "type": "doctype",
                        "name": "Data Entry Allocation",
                        "description": _("Data Entry Allocation records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Entry Dashboard",
                        "description": _("Entry Dashboard Records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Verifier Dashboard",
                        "description": _("Verify Dashboard Records"),
                    },
                    {
                        "type": "doctype",
                        "name": "QC Allocation",
                        "description": _("Allocate case for QC"),
                    },
                    {
                        "type": "doctype",
                        "name": "QC Verification",
                        "description": _("Verify Allocated case for QC"),
                    },
                    {
                        "type": "doctype",
                        "name": "Archive",
                        "description": _("Case Data"),
                    },
                    {
                        "type": "doctype",
                        "name": "Generate SO",
                        "description": _("Generate SO"),
                    },
                ]
            },
        ]
    elif bvs_manager:
        return [
            {
                "label": _("Applicant and Checks Group"),
                "items": [
                    {
                        "type": "doctype",
                        "name": "Checks Group",
                        "description": _("Checks records"),
                    },
                    {
                        "type": "doctype",
                        "name": "BG Profile",
                        "description": _("Checks records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Client Data",
                        "description": _("Client records."),
                    },
                    {
                        "type": "doctype",
                        "name": "Applicant",
                        "description": _("Applicant records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Allocate Checks",
                        "description": _("Checks Assigned to Executives"),
                    },
                    {
                        "type": "doctype",
                        "name": "Data Entry Allocation",
                        "description": _("Data Entry Allocation records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Entry Dashboard",
                        "description": _("Entry Dashboard Records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Verifier Dashboard",
                        "description": _("Verify Dashboard Records"),
                    },
                    {
                        "type": "doctype",
                        "name": "QC Allocation",
                        "description": _("Allocate case for QC"),
                    },
                    {
                        "type": "doctype",
                        "name": "QC Verification",
                        "description": _("Verify Allocated case for QC"),
                    },
                    {
                        "type": "doctype",
                        "name": "Archive",
                        "description": _("Case Data"),
                    },
                    {
                        "type": "doctype",
                        "name": "Generate SO",
                        "description": _("Generate SO"),
                    },
                ]
            },
        ]
    elif bvs_verifier:
        return [
            {
                "label": _("Applicant and Checks Group"),
                "items": [
                    {
                        "type": "doctype",
                        "name": "Applicant",
                        "description": _("Applicant records"),
                    },
                    {
                        "type": "doctype",
                        "name": "BG Profile",
                        "description": _("Checks records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Verifier Dashboard",
                        "description": _("Verify Dashboard Records"),
                    },
                    {
                        "type": "doctype",
                        "name": "QC Verification",
                        "description": _("Verify Allocated case for QC"),
                    }
                ]
            },
        ]
    elif bvs_deo:
        return [
            {
                "label": _("Applicant and Checks Group"),
                "items": [
                    {
                        "type": "doctype",
                        "name": "Applicant",
                        "description": _("Applicant records"),
                    },
                    {
                        "type": "doctype",
                        "name": "BG Profile",
                        "description": _("Checks records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Entry Dashboard",
                        "description": _("Entry Dashboard Records"),
                    }
                ]
            },
        ]
    else:
        return [
            {
                "label": _("Applicant and Checks Group"),
                "items": [
                    {
                        "type": "doctype",
                        "name": "Checks Group",
                        "description": _("Checks records"),
                    },
                    {
                        "type": "doctype",
                        "name": "BG Profile",
                        "description": _("Checks records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Client Data",
                        "description": _("Client records."),
                    },
                    {
                        "type": "doctype",
                        "name": "Add Applicant",
                        "description": _("Applicant records"),
                    },
                    {
                        "type": "doctype",
                        "name": "Archive",
                        "description": _("Case Data"),
                    },
                ]
            },
        ]
