from frappe import _


def get_data():
    return [
        {
            "label": _("BVS"),
            "icon": "fa fa-search",
                    "items": [
                {
                    "type": "doctype",
                    "name": "Profile",
                    "description": _("BVS Cases."),
                },
                {
                    "type": "doctype",
                    "name": "Checks Group",
                    "description": _("Check Groups of Customer"),
                }
            ]
        },
        {
            "label": _("Entry"),
            "icon": "fa fa-search",
                    "items": [
                {
                    "type": "doctype",
                    "name": "Add Profile",
                    "label": _("Add Profiles"),
                    "description": _("For adding Profiles"),
                },
                {
                    "type": "doctype",
                    "name": "Bulk Excel Upload",
                    "label": _("Bulk Excel Upload"),
                    "description": _("For adding Profiles"),
                },
            ]
        },

    ]
