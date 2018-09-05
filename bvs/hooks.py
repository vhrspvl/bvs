# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "bvs"
app_title = "Background Verification"
app_publisher = "VHRS"
app_description = "VHRS Background Verification Service"
app_icon = "octicon octicon-search"
app_color = "lightgreen"
app_email = "erp@voltechgroup.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/bvs/css/bvs.css"
# app_include_js = "/assets/bvs/js/bvs.js"

# include js, css files in header of web template
# web_include_css = "/assets/bvs/css/bvs.css"
# web_include_js = "/assets/bvs/js/bvs.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "bvs.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "bvs.install.before_install"
# after_install = "bvs.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "bvs.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#     "Cases": {
#         "after_insert": "vhrs.utils.add_customer",
#     }
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"bvs.tasks.all"
# 	],
# 	"daily": [
# 		"bvs.tasks.daily"
# 	],
# 	"hourly": [
# 		"bvs.tasks.hourly"
# 	],
# 	"weekly": [
# 		"bvs.tasks.weekly"
# 	]
# 	"monthly": [
# 		"bvs.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "bvs.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "bvs.event.get_events"
# }
doc_events = {
    "Employment Check1": {
        "on_update": "bvs.api.create_verify"
    },
    "Employment Check2": {
        "on_update": "bvs.api.create_verify"
    },
    "Employment Check3": {
        "on_update": "bvs.api.create_verify"
    },
    "Employment Check4": {
        "on_update": "bvs.api.create_verify"
    },
    "Education Check1": {
        "on_update": "bvs.api.create_verify"
    },
    "Education Check2": {
        "on_update": "bvs.api.create_verify"
    },
    "Education Check3": {
        "on_update": "bvs.api.create_verify"
    },
    "Education Check4": {
        "on_update": "bvs.api.create_verify"
    },
    "Reference Check1": {
        "on_update": "bvs.api.create_verify"
    },
    "Reference Check2": {
        "on_update": "bvs.api.create_verify"
    },
    "Reference Check3": {
        "on_update": "bvs.api.create_verify"
    },
    "Reference Check4": {
        "on_update": "bvs.api.create_verify"
    },
    "Address Check1": {
        "on_update": "bvs.api.create_verify"
    },
    "Address Check2": {
        "on_update": "bvs.api.create_verify"
    },
    "Address Check3": {
        "on_update": "bvs.api.create_verify"
    },
    "Address Check4": {
        "on_update": "bvs.api.create_verify"
    },
    "Family Check1": {
        "on_update": "bvs.api.create_verify"
    },
    "Family Check2": {
        "on_update": "bvs.api.create_verify"
    },
    "Family Check3": {
        "on_update": "bvs.api.create_verify"
    },
    "Family Check4": {
        "on_update": "bvs.api.create_verify"
    },
    "Aadhar Card Verification": {
        "on_update": "bvs.api.create_verify"
    },
    "Pan Verification": {
        "on_update": "bvs.api.create_verify"
    },
    "Driving License Verification": {
        "on_update": "bvs.api.create_verify"
    },
    "Passport Verification": {
        "on_update": "bvs.api.create_verify"
    },
    "Ration Card Verification": {
        "on_update": "bvs.api.create_verify"
    },
    "Voters ID Verification": {
        "on_update": "bvs.api.create_verify"
    },
    "Civil Check": {
        "on_update": "bvs.api.create_verify"
    },
    "Criminal Check": {
        "on_update": "bvs.api.create_verify"
    },
    "Demographic Data With Attachment": {
        "on_update": "bvs.background_verification.doctype.demographic_data_with_attachment.demographic_data_with_attachment.create_applicant",
    }
    # "Task Candidate": {
    #     "on_update": "recruitment.api.create_closure"
    # },
    #"Project": {
    #    "on_update": "recruitment.utils.apply_perm"
    #}
}