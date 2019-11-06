# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Background Verification",
			"color": "lightgreen",
			"icon": "octicon octicon-search",
			"type": "module",
			"label": _("Background Verification")
		},
		# {
		# 	"module_name": "Entry Dashboard",
		# 	"color": "#589494",
		# 	"icon": "octicon octicon-graph",
		# 	"type": "page",
		# 	"link": "entry_dashboard",
		# 	"label": _("Entry Dashboard")
		# }
	]
