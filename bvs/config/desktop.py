# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Background Verification",
			"color": "grey",
			"icon": "assets/img/verified-user.svg",
			"type": "module",
			"label": _("Background Verification")
			"items": [
				{
					"type": "doctype",
					"name": "Document Upload",
					"label": _("Document Upload"),
					"description": _("Uploaded docs from customer"),
				},
			]

		}
	]
