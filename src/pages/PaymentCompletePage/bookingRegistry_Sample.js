// export const success = 'http://localhost:5173/paymentcomplete?payment_intent=pi_3TmPdyB8sQTyWY5y0JXoPY5Y&payment_intent_client_secret=pi_3TmPdyB8sQTyWY5y0JXoPY5Y_secret_DYeyiY2DMFsRoZavHD4nR5mdw&redirect_status=succeeded'

export const bookingRegistry = {
    "booking_registry_code": "BK-1979293-18072026-25072026",
    "main_guest_name": {
        "guest_booking_for_type": "mainGuest",
        "first_name": "Lewis",
        "last_name": "Keen Marcusia "
    },
    "country_region": {
        "country_code": "AU",
        "country_name": "Australia"
    },
    "email": "123@gmail.com",
    "phone": {
        "region_code": "+54",
        "region_country": "Argentina",
        "region_country_code": "AR",
        "phone_number": "128783224"
    },
    "company": {
        "is_Company_Business": false,
        "company_data": {
            "company_name": "",
            "company_reg_num": ""
        }
    },
    "main_hotel_booked": {
        "main_hotel_name": "Oxley Thanksgiving Residence",
        "main_hotel_address": "328 River Valley Road",
        "checking_start_end_time": {
            "check_in_date": "18 Jul 2026",
            "check_out_date": "25 Jul 2026",
            "total_days": 7
        },
        "guest": {
            "adults": 1,
            "childs": 0
        },
        "total_cost": {
            "grand_total_cost": 12033.33,
            "grand_total_cost_deceimal": 1203333,
            "currency": "MYR"
        },
        "select_room_offers": [
            {
                "base_room_id": 197929304,
                "base_room_name": "Deluxe One-Bedroom Apartment",
                "base_room_surface_m2": 37,
                "base_main_photos": "https://cf.bstatic.com/xdata/images/hotel/square60/830670924.jpg?k=fb51e876fad1bb91f92107f6579b96a709bebb5911a3cb664182e469ddad6e44&o=",
                "base_select_room_total_amount": 3,
                "base_select_room": [
                    {
                        "block_id": "197929304_102416209_3_0_0_240561",
                        "spec_room_data": {
                            "nr_stays": 2,
                            "must_reserve_free_parking": 1,
                            "package_id": 0,
                            "is_vp2_enrolled": 1,
                            "transactional_policy_data": {
                                "policies": [
                                    {
                                        "text": "Flexible to reschedule if plans change",
                                        "type": "reschedule",
                                        "icon": "checkmark",
                                        "policy_type_key": "flexible_to_reschedule",
                                        "key": "NrOneFreeDateChangeKey"
                                    },
                                    {
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "key": "NonRefundableKey",
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": null
                                    },
                                    {
                                        "policy_type_key": "pbb_at_booking_time",
                                        "key": "VP2PayInAdvanceKey",
                                        "text": "Pay online",
                                        "type": "prepayment",
                                        "icon": "credit_card_back",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    }
                                ],
                                "applied_products": [
                                    "pay_in_follows_policy",
                                    "bsb"
                                ],
                                "booking_conditions": [
                                    {
                                        "description": "The total price of the reservation is charged at the time of booking.",
                                        "icon": "credit_card",
                                        "text": "Prepayment",
                                        "type": "prepayment",
                                        "key": "VP2PayInAdvanceKey",
                                        "policy_type_key": "pbb_at_booking_time"
                                    },
                                    {
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "policy_type_key": "non_refundable",
                                        "key": "NonRefundableKey",
                                        "icon": "stop",
                                        "type": "cancellation",
                                        "text": "Non-refundable"
                                    }
                                ]
                            },
                            "number_of_bathrooms": 1,
                            "breakfast_included": 0,
                            "policy_display_details": {
                                "reschedule": {
                                    "title_details": {
                                        "placeholder_translation": "Flexible to reschedule if plans change",
                                        "translation": "Flexible to reschedule if plans change",
                                        "tag": "tpex_rm_nr_flex_to_reschedule"
                                    }
                                },
                                "cancellation": {
                                    "description_details": {
                                        "translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "placeholder_translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    },
                                    "is_cost_to_cancel": 0,
                                    "title_details": {
                                        "tag": "cxl_nr_name",
                                        "translation": "Non-refundable",
                                        "placeholder_translation": "Non-refundable"
                                    },
                                    "policy_type_key": "non_refundable",
                                    "type": "non_refundable",
                                    "parameters": {
                                        "has_cancellation_fee": 1
                                    }
                                },
                                "prepayment": {
                                    "title_details": {
                                        "placeholder_translation": "Pay online",
                                        "translation": "Pay online",
                                        "tag": "payment_pay_online_name"
                                    },
                                    "type": "partial_prepayment",
                                    "policy_type_key": "pbb_at_booking_time",
                                    "description_details": {
                                        "translation": "The total price of the reservation is charged at the time of booking.",
                                        "tag": "payment_in_advance_fe2_description",
                                        "placeholder_translation": "The total price of the reservation is charged at the time of booking."
                                    }
                                },
                                "applied_products": [
                                    "pay_in_follows_policy",
                                    "bsb"
                                ]
                            },
                            "block_text": {
                                "policies": [
                                    {
                                        "content": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation.",
                                        "class": "POLICY_CANCELLATION"
                                    },
                                    {
                                        "class": "POLICY_PREPAY",
                                        "content": "The total price of the reservation is charged at the time of booking."
                                    },
                                    {
                                        "content": "Non Refundable",
                                        "class": "POLICY_TITLE"
                                    }
                                ]
                            },
                            "bh_room_highlights": [
                                {
                                    "icon_list": [
                                        {
                                            "size": 1,
                                            "icon": "opendoor"
                                        }
                                    ],
                                    "context": 5,
                                    "name": "1 bedroom"
                                },
                                {
                                    "context": 5,
                                    "name": "37 m²",
                                    "icon_list": [
                                        {
                                            "size": 1,
                                            "icon": "roomsize"
                                        }
                                    ]
                                },
                                {
                                    "name": "Living Room",
                                    "context": 4,
                                    "icon_list": [
                                        {
                                            "icon": "couch",
                                            "size": 1
                                        }
                                    ]
                                },
                                {
                                    "icon_list": [
                                        {
                                            "icon": "oven",
                                            "size": 1
                                        }
                                    ],
                                    "context": 4,
                                    "name": "Kitchen"
                                },
                                {
                                    "icon_list": [
                                        {
                                            "icon": "viewed",
                                            "size": 1
                                        }
                                    ],
                                    "name": "View",
                                    "context": 4
                                }
                            ],
                            "is_last_minute_deal": 0,
                            "children_ages": [],
                            "nr_one_free_date_change": {
                                "policy_long": "However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                "policy_short": "Flexible to reschedule if plans change",
                                "date_change_until": "July 11, 2026"
                            },
                            "paymentterms": {
                                "cancellation": {
                                    "type": "non_refundable",
                                    "bucket": "SMP_NON_REF",
                                    "guaranteed_non_refundable": 0,
                                    "info": {
                                        "timezone_offset": null,
                                        "timezone": null,
                                        "refundable": 0,
                                        "refundable_date": null,
                                        "date_before": null,
                                        "date_before_raw": null,
                                        "time": null,
                                        "date": null,
                                        "date_raw": null,
                                        "is_midnight": null,
                                        "time_before_midnight": null
                                    },
                                    "non_refundable_anymore": 0,
                                    "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged.",
                                    "type_translation": "Non-refundable"
                                },
                                "prepayment": {
                                    "simple_translation": "Prepayment",
                                    "type": "full_prepayment",
                                    "info": {
                                        "date_before": null,
                                        "refundable": 0,
                                        "timezone": null,
                                        "timezone_offset": null,
                                        "time_before_midnight": null,
                                        "is_midnight": null,
                                        "date": null,
                                        "prepayment_at_booktime": 0,
                                        "time": null
                                    },
                                    "type_translation": "SECURE YOUR BOOKING – pay now",
                                    "description": "You'll be charged a prepayment of the total price at any time.",
                                    "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                                    "type_extended": "non_refundable_prepayment"
                                }
                            },
                            "full_board": 0,
                            "mealplan": "There is no meal option with this room.",
                            "name_without_policy": "Deluxe One-Bedroom Apartment",
                            "nr_children": 0,
                            "refundable": 0,
                            "depositterms_id": 1,
                            "room_surface_in_m2": 37,
                            "room_surface_in_feet2": 398.2646848,
                            "is_block_fit": 1,
                            "babycots_available": 0,
                            "roomtype_id": 1,
                            "max_children_free_age": 7,
                            "genius_discount_percentage": 0,
                            "extrabed_available": 0,
                            "room_id": 197929304,
                            "max_occupancy": 3,
                            "refundable_until": "",
                            "can_reserve_free_parking": 1,
                            "b_bsb_campaigns": [
                                {
                                    "b_is_bsb": 1
                                }
                            ],
                            "pay_in_advance": 1,
                            "room_count": 4,
                            "half_board": 0,
                            "all_inclusive": 0,
                            "block_id": "197929304_102416209_3_0_0_240561",
                            "fit_status": 2,
                            "name": "Deluxe One-Bedroom Apartment - Non-refundable",
                            "is_dormitory": 0,
                            "extrabed_available_amount": null,
                            "fit_occupancy": {
                                "children_ages": [],
                                "nr_adults": 1
                            },
                            "is_smart_deal": 0,
                            "paymentterms_id": 1,
                            "deposit_required": 1,
                            "max_children_free": 0,
                            "cfar_data": {
                                "is_applied": 0
                            },
                            "transactional_policy_objects": [
                                {
                                    "key": "NrOneFreeDateChangeKey",
                                    "icon": "checkmark",
                                    "text": "Flexible to reschedule if plans change"
                                },
                                {
                                    "text": "Non-refundable",
                                    "icon": null,
                                    "key": "NonRefundableKey"
                                },
                                {
                                    "icon": "credit_card_back",
                                    "text": "Pay online",
                                    "key": "VP2PayInAdvanceKey"
                                }
                            ],
                            "bundle_extras": {
                                "generated_name": "Parking + high-speed internet ",
                                "has_rich_content": "",
                                "experiments": [
                                    {
                                        "tag": "ios_value_adds_copy_experiment_3",
                                        "stages": [
                                            "1",
                                            "3"
                                        ]
                                    }
                                ],
                                "rich_value_add_page_title": "",
                                "bundle_id": 240561,
                                "icon": "",
                                "benefits": [
                                    {
                                        "icon": "558819",
                                        "name": "Parking",
                                        "category": "parking",
                                        "details": [
                                            "Self parking for one vehicle per booked unit per stay."
                                        ],
                                        "title": "Parking",
                                        "catalog_item_id": 1
                                    },
                                    {
                                        "name": "Internet",
                                        "title": "High-speed internet",
                                        "catalog_item_id": 18,
                                        "category": "internet",
                                        "icon": "558820",
                                        "details": [
                                            "High-speed internet throughout your stay."
                                        ]
                                    }
                                ],
                                "rich_footer": [
                                    "Contact the property to arrange this service.",
                                    "All additional services are the responsibility of the property.",
                                    "Any unused products and services included in the rate are non-refundable."
                                ],
                                "highlighted_text": "Includes 1 parking spot + high-speed internet "
                            },
                            "smoking": 0,
                            "babycots_available_amount": null,
                            "is_flash_deal": 0,
                            "room_name": "Deluxe One-Bedroom Apartment",
                            "nr_adults": 3,
                            "product_price_breakdown": {
                                "charges_details": {
                                    "mode": "all_included",
                                    "amount": {
                                        "currency": "MYR",
                                        "value": 0
                                    },
                                    "translated_copy": "Includes taxes and fees"
                                },
                                "gross_amount_per_night": {
                                    "value": 573.015718416208,
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 573.02",
                                    "amount_rounded": "MYR 573"
                                },
                                "strikethrough_amount_per_night": {
                                    "currency": "MYR",
                                    "value": 830.455996501248,
                                    "amount_rounded": "MYR 830",
                                    "amount_unrounded": "MYR 830.46"
                                },
                                "benefits": [
                                    {
                                        "identifier": "combined-discount",
                                        "badge_variant": "constructive",
                                        "name": "MYR 1,802 off",
                                        "kind": "badge",
                                        "icon": null,
                                        "details": "You’re getting MYR 1,802 off the original price due to multiple deals and benefits."
                                    },
                                    {
                                        "name": "Getaway Deal",
                                        "badge_variant": "constructive",
                                        "identifier": "getaway-2021",
                                        "icon": null,
                                        "kind": "badge",
                                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026."
                                    }
                                ],
                                "has_long_stays_monthly_rate_price": 0,
                                "net_amount": {
                                    "value": 4011.11002891345,
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 4,011",
                                    "amount_unrounded": "MYR 4,011.11"
                                },
                                "gross_amount_hotel_currency": {
                                    "amount_unrounded": "S$ 1,272.39",
                                    "amount_rounded": "S$ 1,272",
                                    "value": 1272.39,
                                    "currency": "SGD"
                                },
                                "has_long_stays_weekly_rate_price": 0,
                                "gross_amount": {
                                    "amount_rounded": "MYR 4,011",
                                    "amount_unrounded": "MYR 4,011.11",
                                    "currency": "MYR",
                                    "value": 4011.11002891345
                                },
                                "price_display_config": [
                                    {
                                        "key": "use_nightly_prices",
                                        "value": 0
                                    },
                                    {
                                        "key": "use_nightly_as_dominant",
                                        "value": 0
                                    },
                                    {
                                        "value": 1,
                                        "key": "use_js_tracking"
                                    }
                                ],
                                "all_inclusive_amount": {
                                    "currency": "MYR",
                                    "value": 4011.11002891345,
                                    "amount_unrounded": "MYR 4,011.11",
                                    "amount_rounded": "MYR 4,011"
                                },
                                "nr_stays": 2,
                                "strikethrough_amount": {
                                    "currency": "MYR",
                                    "value": 5813.19197550874,
                                    "amount_rounded": "MYR 5,813",
                                    "amount_unrounded": "MYR 5,813.19"
                                },
                                "discounted_amount": {
                                    "amount_unrounded": "MYR 1,802.08",
                                    "amount_rounded": "MYR 1,802",
                                    "value": 1802.08194659528,
                                    "currency": "MYR"
                                },
                                "items": [
                                    {
                                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026.",
                                        "item_amount": {
                                            "value": 1453.29799387718,
                                            "currency": "MYR",
                                            "amount_unrounded": "MYR 1,453.30",
                                            "amount_rounded": "MYR 1,453"
                                        },
                                        "kind": "discount",
                                        "name": "Getaway Deal",
                                        "identifier": "campaign_38",
                                        "base": {
                                            "kind": "rate"
                                        }
                                    },
                                    {
                                        "details": "You’ll get a reduced rate when you pay online because Booking.com will pay part of the price.",
                                        "kind": "discount",
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 348.7839527181,
                                            "amount_unrounded": "MYR 348.78",
                                            "amount_rounded": "MYR 349"
                                        },
                                        "base": {
                                            "kind": "bsb"
                                        },
                                        "identifier": "BSB",
                                        "name": "Booking.com pays"
                                    }
                                ],
                                "all_inclusive_amount_hotel_currency": {
                                    "value": 1272.39,
                                    "currency": "SGD",
                                    "amount_unrounded": "S$ 1,272.39",
                                    "amount_rounded": "S$ 1,272"
                                },
                                "included_taxes_and_charges_amount": {
                                    "amount_rounded": "MYR 0",
                                    "amount_unrounded": "MYR 0",
                                    "value": 0,
                                    "currency": "MYR"
                                },
                                "excluded_amount": {
                                    "value": 0,
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 0",
                                    "amount_unrounded": "MYR 0"
                                }
                            }
                        },
                        "main_guest_name": "Lewis Keen Marcusia ",
                        "repeatIndex": 0,
                        "uniqueKey": "197929304_102416209_3_0_0_240561-0"
                    },
                    {
                        "block_id": "197929304_102416209_3_0_0_240561",
                        "spec_room_data": {
                            "nr_stays": 2,
                            "must_reserve_free_parking": 1,
                            "package_id": 0,
                            "is_vp2_enrolled": 1,
                            "transactional_policy_data": {
                                "policies": [
                                    {
                                        "text": "Flexible to reschedule if plans change",
                                        "type": "reschedule",
                                        "icon": "checkmark",
                                        "policy_type_key": "flexible_to_reschedule",
                                        "key": "NrOneFreeDateChangeKey"
                                    },
                                    {
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "key": "NonRefundableKey",
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": null
                                    },
                                    {
                                        "policy_type_key": "pbb_at_booking_time",
                                        "key": "VP2PayInAdvanceKey",
                                        "text": "Pay online",
                                        "type": "prepayment",
                                        "icon": "credit_card_back",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    }
                                ],
                                "applied_products": [
                                    "pay_in_follows_policy",
                                    "bsb"
                                ],
                                "booking_conditions": [
                                    {
                                        "description": "The total price of the reservation is charged at the time of booking.",
                                        "icon": "credit_card",
                                        "text": "Prepayment",
                                        "type": "prepayment",
                                        "key": "VP2PayInAdvanceKey",
                                        "policy_type_key": "pbb_at_booking_time"
                                    },
                                    {
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "policy_type_key": "non_refundable",
                                        "key": "NonRefundableKey",
                                        "icon": "stop",
                                        "type": "cancellation",
                                        "text": "Non-refundable"
                                    }
                                ]
                            },
                            "number_of_bathrooms": 1,
                            "breakfast_included": 0,
                            "policy_display_details": {
                                "reschedule": {
                                    "title_details": {
                                        "placeholder_translation": "Flexible to reschedule if plans change",
                                        "translation": "Flexible to reschedule if plans change",
                                        "tag": "tpex_rm_nr_flex_to_reschedule"
                                    }
                                },
                                "cancellation": {
                                    "description_details": {
                                        "translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "placeholder_translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    },
                                    "is_cost_to_cancel": 0,
                                    "title_details": {
                                        "tag": "cxl_nr_name",
                                        "translation": "Non-refundable",
                                        "placeholder_translation": "Non-refundable"
                                    },
                                    "policy_type_key": "non_refundable",
                                    "type": "non_refundable",
                                    "parameters": {
                                        "has_cancellation_fee": 1
                                    }
                                },
                                "prepayment": {
                                    "title_details": {
                                        "placeholder_translation": "Pay online",
                                        "translation": "Pay online",
                                        "tag": "payment_pay_online_name"
                                    },
                                    "type": "partial_prepayment",
                                    "policy_type_key": "pbb_at_booking_time",
                                    "description_details": {
                                        "translation": "The total price of the reservation is charged at the time of booking.",
                                        "tag": "payment_in_advance_fe2_description",
                                        "placeholder_translation": "The total price of the reservation is charged at the time of booking."
                                    }
                                },
                                "applied_products": [
                                    "pay_in_follows_policy",
                                    "bsb"
                                ]
                            },
                            "block_text": {
                                "policies": [
                                    {
                                        "content": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation.",
                                        "class": "POLICY_CANCELLATION"
                                    },
                                    {
                                        "class": "POLICY_PREPAY",
                                        "content": "The total price of the reservation is charged at the time of booking."
                                    },
                                    {
                                        "content": "Non Refundable",
                                        "class": "POLICY_TITLE"
                                    }
                                ]
                            },
                            "bh_room_highlights": [
                                {
                                    "icon_list": [
                                        {
                                            "size": 1,
                                            "icon": "opendoor"
                                        }
                                    ],
                                    "context": 5,
                                    "name": "1 bedroom"
                                },
                                {
                                    "context": 5,
                                    "name": "37 m²",
                                    "icon_list": [
                                        {
                                            "size": 1,
                                            "icon": "roomsize"
                                        }
                                    ]
                                },
                                {
                                    "name": "Living Room",
                                    "context": 4,
                                    "icon_list": [
                                        {
                                            "icon": "couch",
                                            "size": 1
                                        }
                                    ]
                                },
                                {
                                    "icon_list": [
                                        {
                                            "icon": "oven",
                                            "size": 1
                                        }
                                    ],
                                    "context": 4,
                                    "name": "Kitchen"
                                },
                                {
                                    "icon_list": [
                                        {
                                            "icon": "viewed",
                                            "size": 1
                                        }
                                    ],
                                    "name": "View",
                                    "context": 4
                                }
                            ],
                            "is_last_minute_deal": 0,
                            "children_ages": [],
                            "nr_one_free_date_change": {
                                "policy_long": "However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                "policy_short": "Flexible to reschedule if plans change",
                                "date_change_until": "July 11, 2026"
                            },
                            "paymentterms": {
                                "cancellation": {
                                    "type": "non_refundable",
                                    "bucket": "SMP_NON_REF",
                                    "guaranteed_non_refundable": 0,
                                    "info": {
                                        "timezone_offset": null,
                                        "timezone": null,
                                        "refundable": 0,
                                        "refundable_date": null,
                                        "date_before": null,
                                        "date_before_raw": null,
                                        "time": null,
                                        "date": null,
                                        "date_raw": null,
                                        "is_midnight": null,
                                        "time_before_midnight": null
                                    },
                                    "non_refundable_anymore": 0,
                                    "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged.",
                                    "type_translation": "Non-refundable"
                                },
                                "prepayment": {
                                    "simple_translation": "Prepayment",
                                    "type": "full_prepayment",
                                    "info": {
                                        "date_before": null,
                                        "refundable": 0,
                                        "timezone": null,
                                        "timezone_offset": null,
                                        "time_before_midnight": null,
                                        "is_midnight": null,
                                        "date": null,
                                        "prepayment_at_booktime": 0,
                                        "time": null
                                    },
                                    "type_translation": "SECURE YOUR BOOKING – pay now",
                                    "description": "You'll be charged a prepayment of the total price at any time.",
                                    "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                                    "type_extended": "non_refundable_prepayment"
                                }
                            },
                            "full_board": 0,
                            "mealplan": "There is no meal option with this room.",
                            "name_without_policy": "Deluxe One-Bedroom Apartment",
                            "nr_children": 0,
                            "refundable": 0,
                            "depositterms_id": 1,
                            "room_surface_in_m2": 37,
                            "room_surface_in_feet2": 398.2646848,
                            "is_block_fit": 1,
                            "babycots_available": 0,
                            "roomtype_id": 1,
                            "max_children_free_age": 7,
                            "genius_discount_percentage": 0,
                            "extrabed_available": 0,
                            "room_id": 197929304,
                            "max_occupancy": 3,
                            "refundable_until": "",
                            "can_reserve_free_parking": 1,
                            "b_bsb_campaigns": [
                                {
                                    "b_is_bsb": 1
                                }
                            ],
                            "pay_in_advance": 1,
                            "room_count": 4,
                            "half_board": 0,
                            "all_inclusive": 0,
                            "block_id": "197929304_102416209_3_0_0_240561",
                            "fit_status": 2,
                            "name": "Deluxe One-Bedroom Apartment - Non-refundable",
                            "is_dormitory": 0,
                            "extrabed_available_amount": null,
                            "fit_occupancy": {
                                "children_ages": [],
                                "nr_adults": 1
                            },
                            "is_smart_deal": 0,
                            "paymentterms_id": 1,
                            "deposit_required": 1,
                            "max_children_free": 0,
                            "cfar_data": {
                                "is_applied": 0
                            },
                            "transactional_policy_objects": [
                                {
                                    "key": "NrOneFreeDateChangeKey",
                                    "icon": "checkmark",
                                    "text": "Flexible to reschedule if plans change"
                                },
                                {
                                    "text": "Non-refundable",
                                    "icon": null,
                                    "key": "NonRefundableKey"
                                },
                                {
                                    "icon": "credit_card_back",
                                    "text": "Pay online",
                                    "key": "VP2PayInAdvanceKey"
                                }
                            ],
                            "bundle_extras": {
                                "generated_name": "Parking + high-speed internet ",
                                "has_rich_content": "",
                                "experiments": [
                                    {
                                        "tag": "ios_value_adds_copy_experiment_3",
                                        "stages": [
                                            "1",
                                            "3"
                                        ]
                                    }
                                ],
                                "rich_value_add_page_title": "",
                                "bundle_id": 240561,
                                "icon": "",
                                "benefits": [
                                    {
                                        "icon": "558819",
                                        "name": "Parking",
                                        "category": "parking",
                                        "details": [
                                            "Self parking for one vehicle per booked unit per stay."
                                        ],
                                        "title": "Parking",
                                        "catalog_item_id": 1
                                    },
                                    {
                                        "name": "Internet",
                                        "title": "High-speed internet",
                                        "catalog_item_id": 18,
                                        "category": "internet",
                                        "icon": "558820",
                                        "details": [
                                            "High-speed internet throughout your stay."
                                        ]
                                    }
                                ],
                                "rich_footer": [
                                    "Contact the property to arrange this service.",
                                    "All additional services are the responsibility of the property.",
                                    "Any unused products and services included in the rate are non-refundable."
                                ],
                                "highlighted_text": "Includes 1 parking spot + high-speed internet "
                            },
                            "smoking": 0,
                            "babycots_available_amount": null,
                            "is_flash_deal": 0,
                            "room_name": "Deluxe One-Bedroom Apartment",
                            "nr_adults": 3,
                            "product_price_breakdown": {
                                "charges_details": {
                                    "mode": "all_included",
                                    "amount": {
                                        "currency": "MYR",
                                        "value": 0
                                    },
                                    "translated_copy": "Includes taxes and fees"
                                },
                                "gross_amount_per_night": {
                                    "value": 573.015718416208,
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 573.02",
                                    "amount_rounded": "MYR 573"
                                },
                                "strikethrough_amount_per_night": {
                                    "currency": "MYR",
                                    "value": 830.455996501248,
                                    "amount_rounded": "MYR 830",
                                    "amount_unrounded": "MYR 830.46"
                                },
                                "benefits": [
                                    {
                                        "identifier": "combined-discount",
                                        "badge_variant": "constructive",
                                        "name": "MYR 1,802 off",
                                        "kind": "badge",
                                        "icon": null,
                                        "details": "You’re getting MYR 1,802 off the original price due to multiple deals and benefits."
                                    },
                                    {
                                        "name": "Getaway Deal",
                                        "badge_variant": "constructive",
                                        "identifier": "getaway-2021",
                                        "icon": null,
                                        "kind": "badge",
                                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026."
                                    }
                                ],
                                "has_long_stays_monthly_rate_price": 0,
                                "net_amount": {
                                    "value": 4011.11002891345,
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 4,011",
                                    "amount_unrounded": "MYR 4,011.11"
                                },
                                "gross_amount_hotel_currency": {
                                    "amount_unrounded": "S$ 1,272.39",
                                    "amount_rounded": "S$ 1,272",
                                    "value": 1272.39,
                                    "currency": "SGD"
                                },
                                "has_long_stays_weekly_rate_price": 0,
                                "gross_amount": {
                                    "amount_rounded": "MYR 4,011",
                                    "amount_unrounded": "MYR 4,011.11",
                                    "currency": "MYR",
                                    "value": 4011.11002891345
                                },
                                "price_display_config": [
                                    {
                                        "key": "use_nightly_prices",
                                        "value": 0
                                    },
                                    {
                                        "key": "use_nightly_as_dominant",
                                        "value": 0
                                    },
                                    {
                                        "value": 1,
                                        "key": "use_js_tracking"
                                    }
                                ],
                                "all_inclusive_amount": {
                                    "currency": "MYR",
                                    "value": 4011.11002891345,
                                    "amount_unrounded": "MYR 4,011.11",
                                    "amount_rounded": "MYR 4,011"
                                },
                                "nr_stays": 2,
                                "strikethrough_amount": {
                                    "currency": "MYR",
                                    "value": 5813.19197550874,
                                    "amount_rounded": "MYR 5,813",
                                    "amount_unrounded": "MYR 5,813.19"
                                },
                                "discounted_amount": {
                                    "amount_unrounded": "MYR 1,802.08",
                                    "amount_rounded": "MYR 1,802",
                                    "value": 1802.08194659528,
                                    "currency": "MYR"
                                },
                                "items": [
                                    {
                                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026.",
                                        "item_amount": {
                                            "value": 1453.29799387718,
                                            "currency": "MYR",
                                            "amount_unrounded": "MYR 1,453.30",
                                            "amount_rounded": "MYR 1,453"
                                        },
                                        "kind": "discount",
                                        "name": "Getaway Deal",
                                        "identifier": "campaign_38",
                                        "base": {
                                            "kind": "rate"
                                        }
                                    },
                                    {
                                        "details": "You’ll get a reduced rate when you pay online because Booking.com will pay part of the price.",
                                        "kind": "discount",
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 348.7839527181,
                                            "amount_unrounded": "MYR 348.78",
                                            "amount_rounded": "MYR 349"
                                        },
                                        "base": {
                                            "kind": "bsb"
                                        },
                                        "identifier": "BSB",
                                        "name": "Booking.com pays"
                                    }
                                ],
                                "all_inclusive_amount_hotel_currency": {
                                    "value": 1272.39,
                                    "currency": "SGD",
                                    "amount_unrounded": "S$ 1,272.39",
                                    "amount_rounded": "S$ 1,272"
                                },
                                "included_taxes_and_charges_amount": {
                                    "amount_rounded": "MYR 0",
                                    "amount_unrounded": "MYR 0",
                                    "value": 0,
                                    "currency": "MYR"
                                },
                                "excluded_amount": {
                                    "value": 0,
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 0",
                                    "amount_unrounded": "MYR 0"
                                }
                            }
                        },
                        "main_guest_name": "",
                        "repeatIndex": 1,
                        "uniqueKey": "197929304_102416209_3_0_0_240561-1"
                    },
                    {
                        "block_id": "197929304_102416209_3_0_0_240561",
                        "spec_room_data": {
                            "nr_stays": 2,
                            "must_reserve_free_parking": 1,
                            "package_id": 0,
                            "is_vp2_enrolled": 1,
                            "transactional_policy_data": {
                                "policies": [
                                    {
                                        "text": "Flexible to reschedule if plans change",
                                        "type": "reschedule",
                                        "icon": "checkmark",
                                        "policy_type_key": "flexible_to_reschedule",
                                        "key": "NrOneFreeDateChangeKey"
                                    },
                                    {
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "key": "NonRefundableKey",
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": null
                                    },
                                    {
                                        "policy_type_key": "pbb_at_booking_time",
                                        "key": "VP2PayInAdvanceKey",
                                        "text": "Pay online",
                                        "type": "prepayment",
                                        "icon": "credit_card_back",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    }
                                ],
                                "applied_products": [
                                    "pay_in_follows_policy",
                                    "bsb"
                                ],
                                "booking_conditions": [
                                    {
                                        "description": "The total price of the reservation is charged at the time of booking.",
                                        "icon": "credit_card",
                                        "text": "Prepayment",
                                        "type": "prepayment",
                                        "key": "VP2PayInAdvanceKey",
                                        "policy_type_key": "pbb_at_booking_time"
                                    },
                                    {
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "policy_type_key": "non_refundable",
                                        "key": "NonRefundableKey",
                                        "icon": "stop",
                                        "type": "cancellation",
                                        "text": "Non-refundable"
                                    }
                                ]
                            },
                            "number_of_bathrooms": 1,
                            "breakfast_included": 0,
                            "policy_display_details": {
                                "reschedule": {
                                    "title_details": {
                                        "placeholder_translation": "Flexible to reschedule if plans change",
                                        "translation": "Flexible to reschedule if plans change",
                                        "tag": "tpex_rm_nr_flex_to_reschedule"
                                    }
                                },
                                "cancellation": {
                                    "description_details": {
                                        "translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "placeholder_translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    },
                                    "is_cost_to_cancel": 0,
                                    "title_details": {
                                        "tag": "cxl_nr_name",
                                        "translation": "Non-refundable",
                                        "placeholder_translation": "Non-refundable"
                                    },
                                    "policy_type_key": "non_refundable",
                                    "type": "non_refundable",
                                    "parameters": {
                                        "has_cancellation_fee": 1
                                    }
                                },
                                "prepayment": {
                                    "title_details": {
                                        "placeholder_translation": "Pay online",
                                        "translation": "Pay online",
                                        "tag": "payment_pay_online_name"
                                    },
                                    "type": "partial_prepayment",
                                    "policy_type_key": "pbb_at_booking_time",
                                    "description_details": {
                                        "translation": "The total price of the reservation is charged at the time of booking.",
                                        "tag": "payment_in_advance_fe2_description",
                                        "placeholder_translation": "The total price of the reservation is charged at the time of booking."
                                    }
                                },
                                "applied_products": [
                                    "pay_in_follows_policy",
                                    "bsb"
                                ]
                            },
                            "block_text": {
                                "policies": [
                                    {
                                        "content": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation.",
                                        "class": "POLICY_CANCELLATION"
                                    },
                                    {
                                        "class": "POLICY_PREPAY",
                                        "content": "The total price of the reservation is charged at the time of booking."
                                    },
                                    {
                                        "content": "Non Refundable",
                                        "class": "POLICY_TITLE"
                                    }
                                ]
                            },
                            "bh_room_highlights": [
                                {
                                    "icon_list": [
                                        {
                                            "size": 1,
                                            "icon": "opendoor"
                                        }
                                    ],
                                    "context": 5,
                                    "name": "1 bedroom"
                                },
                                {
                                    "context": 5,
                                    "name": "37 m²",
                                    "icon_list": [
                                        {
                                            "size": 1,
                                            "icon": "roomsize"
                                        }
                                    ]
                                },
                                {
                                    "name": "Living Room",
                                    "context": 4,
                                    "icon_list": [
                                        {
                                            "icon": "couch",
                                            "size": 1
                                        }
                                    ]
                                },
                                {
                                    "icon_list": [
                                        {
                                            "icon": "oven",
                                            "size": 1
                                        }
                                    ],
                                    "context": 4,
                                    "name": "Kitchen"
                                },
                                {
                                    "icon_list": [
                                        {
                                            "icon": "viewed",
                                            "size": 1
                                        }
                                    ],
                                    "name": "View",
                                    "context": 4
                                }
                            ],
                            "is_last_minute_deal": 0,
                            "children_ages": [],
                            "nr_one_free_date_change": {
                                "policy_long": "However, you can reschedule your stay one time until July 11, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                "policy_short": "Flexible to reschedule if plans change",
                                "date_change_until": "July 11, 2026"
                            },
                            "paymentterms": {
                                "cancellation": {
                                    "type": "non_refundable",
                                    "bucket": "SMP_NON_REF",
                                    "guaranteed_non_refundable": 0,
                                    "info": {
                                        "timezone_offset": null,
                                        "timezone": null,
                                        "refundable": 0,
                                        "refundable_date": null,
                                        "date_before": null,
                                        "date_before_raw": null,
                                        "time": null,
                                        "date": null,
                                        "date_raw": null,
                                        "is_midnight": null,
                                        "time_before_midnight": null
                                    },
                                    "non_refundable_anymore": 0,
                                    "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged.",
                                    "type_translation": "Non-refundable"
                                },
                                "prepayment": {
                                    "simple_translation": "Prepayment",
                                    "type": "full_prepayment",
                                    "info": {
                                        "date_before": null,
                                        "refundable": 0,
                                        "timezone": null,
                                        "timezone_offset": null,
                                        "time_before_midnight": null,
                                        "is_midnight": null,
                                        "date": null,
                                        "prepayment_at_booktime": 0,
                                        "time": null
                                    },
                                    "type_translation": "SECURE YOUR BOOKING – pay now",
                                    "description": "You'll be charged a prepayment of the total price at any time.",
                                    "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                                    "type_extended": "non_refundable_prepayment"
                                }
                            },
                            "full_board": 0,
                            "mealplan": "There is no meal option with this room.",
                            "name_without_policy": "Deluxe One-Bedroom Apartment",
                            "nr_children": 0,
                            "refundable": 0,
                            "depositterms_id": 1,
                            "room_surface_in_m2": 37,
                            "room_surface_in_feet2": 398.2646848,
                            "is_block_fit": 1,
                            "babycots_available": 0,
                            "roomtype_id": 1,
                            "max_children_free_age": 7,
                            "genius_discount_percentage": 0,
                            "extrabed_available": 0,
                            "room_id": 197929304,
                            "max_occupancy": 3,
                            "refundable_until": "",
                            "can_reserve_free_parking": 1,
                            "b_bsb_campaigns": [
                                {
                                    "b_is_bsb": 1
                                }
                            ],
                            "pay_in_advance": 1,
                            "room_count": 4,
                            "half_board": 0,
                            "all_inclusive": 0,
                            "block_id": "197929304_102416209_3_0_0_240561",
                            "fit_status": 2,
                            "name": "Deluxe One-Bedroom Apartment - Non-refundable",
                            "is_dormitory": 0,
                            "extrabed_available_amount": null,
                            "fit_occupancy": {
                                "children_ages": [],
                                "nr_adults": 1
                            },
                            "is_smart_deal": 0,
                            "paymentterms_id": 1,
                            "deposit_required": 1,
                            "max_children_free": 0,
                            "cfar_data": {
                                "is_applied": 0
                            },
                            "transactional_policy_objects": [
                                {
                                    "key": "NrOneFreeDateChangeKey",
                                    "icon": "checkmark",
                                    "text": "Flexible to reschedule if plans change"
                                },
                                {
                                    "text": "Non-refundable",
                                    "icon": null,
                                    "key": "NonRefundableKey"
                                },
                                {
                                    "icon": "credit_card_back",
                                    "text": "Pay online",
                                    "key": "VP2PayInAdvanceKey"
                                }
                            ],
                            "bundle_extras": {
                                "generated_name": "Parking + high-speed internet ",
                                "has_rich_content": "",
                                "experiments": [
                                    {
                                        "tag": "ios_value_adds_copy_experiment_3",
                                        "stages": [
                                            "1",
                                            "3"
                                        ]
                                    }
                                ],
                                "rich_value_add_page_title": "",
                                "bundle_id": 240561,
                                "icon": "",
                                "benefits": [
                                    {
                                        "icon": "558819",
                                        "name": "Parking",
                                        "category": "parking",
                                        "details": [
                                            "Self parking for one vehicle per booked unit per stay."
                                        ],
                                        "title": "Parking",
                                        "catalog_item_id": 1
                                    },
                                    {
                                        "name": "Internet",
                                        "title": "High-speed internet",
                                        "catalog_item_id": 18,
                                        "category": "internet",
                                        "icon": "558820",
                                        "details": [
                                            "High-speed internet throughout your stay."
                                        ]
                                    }
                                ],
                                "rich_footer": [
                                    "Contact the property to arrange this service.",
                                    "All additional services are the responsibility of the property.",
                                    "Any unused products and services included in the rate are non-refundable."
                                ],
                                "highlighted_text": "Includes 1 parking spot + high-speed internet "
                            },
                            "smoking": 0,
                            "babycots_available_amount": null,
                            "is_flash_deal": 0,
                            "room_name": "Deluxe One-Bedroom Apartment",
                            "nr_adults": 3,
                            "product_price_breakdown": {
                                "charges_details": {
                                    "mode": "all_included",
                                    "amount": {
                                        "currency": "MYR",
                                        "value": 0
                                    },
                                    "translated_copy": "Includes taxes and fees"
                                },
                                "gross_amount_per_night": {
                                    "value": 573.015718416208,
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 573.02",
                                    "amount_rounded": "MYR 573"
                                },
                                "strikethrough_amount_per_night": {
                                    "currency": "MYR",
                                    "value": 830.455996501248,
                                    "amount_rounded": "MYR 830",
                                    "amount_unrounded": "MYR 830.46"
                                },
                                "benefits": [
                                    {
                                        "identifier": "combined-discount",
                                        "badge_variant": "constructive",
                                        "name": "MYR 1,802 off",
                                        "kind": "badge",
                                        "icon": null,
                                        "details": "You’re getting MYR 1,802 off the original price due to multiple deals and benefits."
                                    },
                                    {
                                        "name": "Getaway Deal",
                                        "badge_variant": "constructive",
                                        "identifier": "getaway-2021",
                                        "icon": null,
                                        "kind": "badge",
                                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026."
                                    }
                                ],
                                "has_long_stays_monthly_rate_price": 0,
                                "net_amount": {
                                    "value": 4011.11002891345,
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 4,011",
                                    "amount_unrounded": "MYR 4,011.11"
                                },
                                "gross_amount_hotel_currency": {
                                    "amount_unrounded": "S$ 1,272.39",
                                    "amount_rounded": "S$ 1,272",
                                    "value": 1272.39,
                                    "currency": "SGD"
                                },
                                "has_long_stays_weekly_rate_price": 0,
                                "gross_amount": {
                                    "amount_rounded": "MYR 4,011",
                                    "amount_unrounded": "MYR 4,011.11",
                                    "currency": "MYR",
                                    "value": 4011.11002891345
                                },
                                "price_display_config": [
                                    {
                                        "key": "use_nightly_prices",
                                        "value": 0
                                    },
                                    {
                                        "key": "use_nightly_as_dominant",
                                        "value": 0
                                    },
                                    {
                                        "value": 1,
                                        "key": "use_js_tracking"
                                    }
                                ],
                                "all_inclusive_amount": {
                                    "currency": "MYR",
                                    "value": 4011.11002891345,
                                    "amount_unrounded": "MYR 4,011.11",
                                    "amount_rounded": "MYR 4,011"
                                },
                                "nr_stays": 2,
                                "strikethrough_amount": {
                                    "currency": "MYR",
                                    "value": 5813.19197550874,
                                    "amount_rounded": "MYR 5,813",
                                    "amount_unrounded": "MYR 5,813.19"
                                },
                                "discounted_amount": {
                                    "amount_unrounded": "MYR 1,802.08",
                                    "amount_rounded": "MYR 1,802",
                                    "value": 1802.08194659528,
                                    "currency": "MYR"
                                },
                                "items": [
                                    {
                                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026.",
                                        "item_amount": {
                                            "value": 1453.29799387718,
                                            "currency": "MYR",
                                            "amount_unrounded": "MYR 1,453.30",
                                            "amount_rounded": "MYR 1,453"
                                        },
                                        "kind": "discount",
                                        "name": "Getaway Deal",
                                        "identifier": "campaign_38",
                                        "base": {
                                            "kind": "rate"
                                        }
                                    },
                                    {
                                        "details": "You’ll get a reduced rate when you pay online because Booking.com will pay part of the price.",
                                        "kind": "discount",
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 348.7839527181,
                                            "amount_unrounded": "MYR 348.78",
                                            "amount_rounded": "MYR 349"
                                        },
                                        "base": {
                                            "kind": "bsb"
                                        },
                                        "identifier": "BSB",
                                        "name": "Booking.com pays"
                                    }
                                ],
                                "all_inclusive_amount_hotel_currency": {
                                    "value": 1272.39,
                                    "currency": "SGD",
                                    "amount_unrounded": "S$ 1,272.39",
                                    "amount_rounded": "S$ 1,272"
                                },
                                "included_taxes_and_charges_amount": {
                                    "amount_rounded": "MYR 0",
                                    "amount_unrounded": "MYR 0",
                                    "value": 0,
                                    "currency": "MYR"
                                },
                                "excluded_amount": {
                                    "value": 0,
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 0",
                                    "amount_unrounded": "MYR 0"
                                }
                            }
                        },
                        "main_guest_name": "",
                        "repeatIndex": 2,
                        "uniqueKey": "197929304_102416209_3_0_0_240561-2"
                    }
                ],
                "base_select_room_description": {
                    "total_same_rooms_name": "3 X Deluxe One-Bedroom Apartment"
                }
            }
        ],
        "rawjsondata": {
            "ufi": -73635,
            "hotel_id": 1979293,
            "hotel_name": "Oxley Thanksgiving Residence",
            "url": "https://www.booking.com/hotel/sg/thanksgiving-serviced-residence.html",
            "hotel_name_trans": "",
            "review_nr": 2136,
            "arrival_date": "2026-07-18",
            "departure_date": "2026-07-25",
            "price_transparency_mode": "none",
            "accommodation_type_name": "Condo Hotels",
            "latitude": 1.2963220381347,
            "longitude": 103.840715979208,
            "address": "328 River Valley Road",
            "address_trans": "",
            "city": "Singapore",
            "city_trans": "Singapore",
            "city_in_trans": "in Singapore",
            "city_name_en": "Singapore",
            "district": "Singapore City Centre",
            "countrycode": "sg",
            "distance_to_cc": 1.41811221482965,
            "default_language": "en-gb",
            "country_trans": "Singapore",
            "currency_code": "SGD",
            "zip": "238360",
            "timezone": "Asia/Singapore",
            "rare_find_state": "RARER_USUALLY_UNAVAILABLE",
            "soldout": 0,
            "available_rooms": 2,
            "max_rooms_in_reservation": 10,
            "average_room_size_for_ufi_m2": "30.33",
            "is_family_friendly": 0,
            "is_closed": 0,
            "is_crimea": 0,
            "is_hotel_ctrip": 0,
            "is_price_transparent": 0,
            "is_genius_deal": 0,
            "is_cash_accepted_check_enabled": 1,
            "qualifies_for_no_cc_reservation": 0,
            "hotel_include_breakfast": 0,
            "opted_out_from_gallery_changes": 1,
            "cc1": "sg",
            "family_facilities": [
                "Outdoor pool (year-round)",
                "Family rooms",
                "Playground",
                "Outdoor pool"
            ],
            "product_price_breakdown": {
                "has_long_stays_monthly_rate_price": 0,
                "benefits": [
                    {
                        "identifier": "combined-discount",
                        "badge_variant": "constructive",
                        "details": "You’re getting MYR 1,802 off the original price due to multiple deals and benefits.",
                        "name": "MYR 1,802 off",
                        "icon": null,
                        "kind": "badge"
                    },
                    {
                        "identifier": "getaway-2021",
                        "badge_variant": "constructive",
                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026.",
                        "kind": "badge",
                        "icon": null,
                        "name": "Getaway Deal"
                    }
                ],
                "strikethrough_amount_per_night": {
                    "amount_rounded": "MYR 830",
                    "currency": "MYR",
                    "value": 830.455996501248,
                    "amount_unrounded": "MYR 830.46"
                },
                "gross_amount_per_night": {
                    "currency": "MYR",
                    "amount_unrounded": "MYR 573.02",
                    "value": 573.015718416208,
                    "amount_rounded": "MYR 573"
                },
                "charges_details": {
                    "mode": "all_included",
                    "translated_copy": "",
                    "amount": {
                        "currency": "MYR",
                        "value": 0
                    }
                },
                "included_taxes_and_charges_amount": {
                    "amount_rounded": "MYR 0",
                    "value": 0,
                    "amount_unrounded": "MYR 0",
                    "currency": "MYR"
                },
                "strikethrough_amount": {
                    "currency": "MYR",
                    "amount_unrounded": "MYR 5,813.19",
                    "value": 5813.19197550874,
                    "amount_rounded": "MYR 5,813"
                },
                "excluded_amount": {
                    "amount_unrounded": "MYR 0",
                    "value": 0,
                    "currency": "MYR",
                    "amount_rounded": "MYR 0"
                },
                "all_inclusive_amount": {
                    "currency": "MYR",
                    "value": 4011.11002891345,
                    "amount_unrounded": "MYR 4,011.11",
                    "amount_rounded": "MYR 4,011"
                },
                "nr_stays": 2,
                "discounted_amount": {
                    "amount_rounded": "MYR 1,802",
                    "currency": "MYR",
                    "amount_unrounded": "MYR 1,802.08",
                    "value": 1802.08194659528
                },
                "gross_amount_hotel_currency": {
                    "amount_rounded": "S$ 1,272",
                    "currency": "SGD",
                    "amount_unrounded": "S$ 1,272.39",
                    "value": 1272.39
                },
                "all_inclusive_amount_hotel_currency": {
                    "currency": "SGD",
                    "value": 1272.39,
                    "amount_unrounded": "S$ 1,272.39",
                    "amount_rounded": "S$ 1,272"
                },
                "net_amount": {
                    "amount_rounded": "MYR 4,011",
                    "value": 4011.11002891345,
                    "amount_unrounded": "MYR 4,011.11",
                    "currency": "MYR"
                },
                "has_long_stays_weekly_rate_price": 0,
                "price_display_config": [
                    {
                        "key": "use_nightly_prices",
                        "value": 0
                    },
                    {
                        "key": "use_nightly_as_dominant",
                        "value": 0
                    },
                    {
                        "value": 1,
                        "key": "use_js_tracking"
                    }
                ],
                "items": [
                    {
                        "name": "Getaway Deal",
                        "kind": "discount",
                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026.",
                        "item_amount": {
                            "value": 1453.29799387718,
                            "amount_unrounded": "MYR 1,453.30",
                            "currency": "MYR",
                            "amount_rounded": "MYR 1,453"
                        },
                        "base": {
                            "kind": "rate"
                        },
                        "identifier": "campaign_38"
                    },
                    {
                        "details": "You’ll get a reduced rate when you pay online because Booking.com will pay part of the price.",
                        "kind": "discount",
                        "name": "Booking.com pays",
                        "identifier": "BSB",
                        "base": {
                            "kind": "bsb"
                        },
                        "item_amount": {
                            "amount_rounded": "MYR 349",
                            "currency": "MYR",
                            "amount_unrounded": "MYR 348.78",
                            "value": 348.7839527181
                        }
                    }
                ],
                "gross_amount": {
                    "amount_rounded": "MYR 4,011",
                    "currency": "MYR",
                    "amount_unrounded": "MYR 4,011.11",
                    "value": 4011.11002891345
                }
            },
            "composite_price_breakdown": {
                "has_long_stays_monthly_rate_price": 0,
                "benefits": [
                    {
                        "icon": null,
                        "name": "MYR 1,802 off",
                        "kind": "badge",
                        "details": "You’re getting MYR 1,802 off the original price due to multiple deals and benefits.",
                        "badge_variant": "constructive",
                        "identifier": "combined-discount"
                    },
                    {
                        "icon": null,
                        "name": "Getaway Deal",
                        "kind": "badge",
                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026.",
                        "badge_variant": "constructive",
                        "identifier": "getaway-2021"
                    }
                ],
                "charges_details": {
                    "mode": "all_included",
                    "translated_copy": "",
                    "amount": {
                        "value": 0,
                        "currency": "MYR"
                    }
                },
                "gross_amount_per_night": {
                    "currency": "MYR",
                    "value": 573.015718416208,
                    "amount_unrounded": "MYR 573.02",
                    "amount_rounded": "MYR 573"
                },
                "strikethrough_amount_per_night": {
                    "amount_rounded": "MYR 830",
                    "value": 830.455996501248,
                    "amount_unrounded": "MYR 830.46",
                    "currency": "MYR"
                },
                "included_taxes_and_charges_amount": {
                    "amount_rounded": "MYR 0",
                    "currency": "MYR",
                    "value": 0,
                    "amount_unrounded": "MYR 0"
                },
                "strikethrough_amount": {
                    "currency": "MYR",
                    "amount_unrounded": "MYR 5,813.19",
                    "value": 5813.19197550874,
                    "amount_rounded": "MYR 5,813"
                },
                "all_inclusive_amount": {
                    "currency": "MYR",
                    "value": 4011.11002891345,
                    "amount_unrounded": "MYR 4,011.11",
                    "amount_rounded": "MYR 4,011"
                },
                "excluded_amount": {
                    "amount_rounded": "MYR 0",
                    "currency": "MYR",
                    "amount_unrounded": "MYR 0",
                    "value": 0
                },
                "discounted_amount": {
                    "amount_rounded": "MYR 1,802",
                    "amount_unrounded": "MYR 1,802.08",
                    "value": 1802.08194659528,
                    "currency": "MYR"
                },
                "gross_amount_hotel_currency": {
                    "currency": "SGD",
                    "amount_unrounded": "S$ 1,272.39",
                    "value": 1272.39,
                    "amount_rounded": "S$ 1,272"
                },
                "net_amount": {
                    "amount_rounded": "MYR 4,011",
                    "amount_unrounded": "MYR 4,011.11",
                    "value": 4011.11002891345,
                    "currency": "MYR"
                },
                "all_inclusive_amount_hotel_currency": {
                    "currency": "SGD",
                    "amount_unrounded": "S$ 1,272.39",
                    "value": 1272.39,
                    "amount_rounded": "S$ 1,272"
                },
                "items": [
                    {
                        "name": "Getaway Deal",
                        "kind": "discount",
                        "details": "This property is offering a discount on select stays between Mar 26 and Sep 30, 2026.",
                        "item_amount": {
                            "currency": "MYR",
                            "amount_unrounded": "MYR 1,453.30",
                            "value": 1453.29799387718,
                            "amount_rounded": "MYR 1,453"
                        },
                        "base": {
                            "kind": "rate"
                        },
                        "identifier": "campaign_38"
                    },
                    {
                        "details": "You’ll get a reduced rate when you pay online because Booking.com will pay part of the price.",
                        "kind": "discount",
                        "name": "Booking.com pays",
                        "identifier": "BSB",
                        "base": {
                            "kind": "bsb"
                        },
                        "item_amount": {
                            "value": 348.7839527181,
                            "amount_unrounded": "MYR 348.78",
                            "currency": "MYR",
                            "amount_rounded": "MYR 349"
                        }
                    }
                ],
                "price_display_config": [
                    {
                        "value": 0,
                        "key": "use_nightly_prices"
                    },
                    {
                        "key": "use_nightly_as_dominant",
                        "value": 0
                    },
                    {
                        "value": 1,
                        "key": "use_js_tracking"
                    }
                ],
                "has_long_stays_weekly_rate_price": 0,
                "gross_amount": {
                    "amount_unrounded": "MYR 4,011.11",
                    "value": 4011.11002891345,
                    "currency": "MYR",
                    "amount_rounded": "MYR 4,011"
                }
            },
            "property_highlight_strip": [
                {
                    "icon_list": [
                        {
                            "icon": "door_open",
                            "size": 1
                        }
                    ],
                    "context": 5,
                    "name": "1 bedroom"
                },
                {
                    "icon_list": [
                        {
                            "icon": "bed",
                            "size": 1
                        }
                    ],
                    "context": 5,
                    "name": "2 beds"
                },
                {
                    "name": "Free Wifi",
                    "icon_list": [
                        {
                            "icon": "wifi",
                            "size": 1
                        }
                    ],
                    "context": 1
                },
                {
                    "icon_list": [
                        {
                            "icon": "food",
                            "size": 1
                        }
                    ],
                    "context": 3,
                    "name": "Kitchen"
                },
                {
                    "icon_list": [
                        {
                            "size": 1,
                            "icon": "bath"
                        }
                    ],
                    "context": 3,
                    "name": "Private Bathroom"
                },
                {
                    "context": 3,
                    "icon_list": [
                        {
                            "icon": "garden",
                            "size": 1
                        }
                    ],
                    "name": "Garden"
                },
                {
                    "name": "Parking",
                    "context": 1,
                    "icon_list": [
                        {
                            "icon": "parking_sign",
                            "size": 1
                        }
                    ]
                },
                {
                    "name": "Washer",
                    "icon_list": [
                        {
                            "size": 1,
                            "icon": "washer"
                        }
                    ],
                    "context": 3
                }
            ],
            "facilities_block": {
                "name": "Most Popular Facilities",
                "type": "popular",
                "facilities": [
                    {
                        "icon": "pool",
                        "name": "1 swimming pool"
                    },
                    {
                        "icon": "nosmoking",
                        "name": "Non-smoking rooms"
                    },
                    {
                        "name": "Fitness center",
                        "icon": "fitness"
                    },
                    {
                        "name": "Free Wifi",
                        "icon": "wifi"
                    },
                    {
                        "name": "Family rooms",
                        "icon": "family"
                    },
                    {
                        "icon": "disabled",
                        "name": "Facilities for disabled guests"
                    },
                    {
                        "name": "Wifi in all areas",
                        "icon": "wifi"
                    },
                    {
                        "icon": "parking_sign",
                        "name": "Free parking"
                    },
                    {
                        "icon": "parking_sign",
                        "name": "Private Parking"
                    }
                ]
            },
            "top_ufi_benefits": [
                {
                    "translated_name": "Wifi",
                    "icon": "wifi"
                },
                {
                    "icon": "pool",
                    "translated_name": "Swimming pool"
                },
                {
                    "translated_name": "Family rooms",
                    "icon": "family"
                },
                {
                    "translated_name": "Outdoor pool",
                    "icon": "pool"
                },
                {
                    "translated_name": "Non-smoking rooms",
                    "icon": "nosmoking"
                },
                {
                    "icon": "parking_sign",
                    "translated_name": "Parking"
                }
            ],
            "languages_spoken": {
                "languagecode": [
                    "zh-cn",
                    "en-gb"
                ]
            },
            "spoken_languages": [
                "zh-cn",
                "en-gb"
            ],
            "breakfast_review_score": {
                "review_number": 0,
                "review_score_word": "",
                "rating": 0,
                "review_snippet": "",
                "review_count": 0,
                "review_score": 0
            },
            "wifi_review_score": {
                "rating": 8.9
            },
            "min_room_distribution": {
                "children": [],
                "adults": 1
            },
            "tax_exceptions": [],
            "booking_home": {
                "checkin_methods": [],
                "is_single_unit_property": 0,
                "is_booking_home": 1,
                "is_single_type_property": 0,
                "house_rules": [
                    {
                        "type": "POLICY_SMOKING",
                        "icon": "smoking",
                        "description": "No smoking",
                        "title": "Smoking"
                    },
                    {
                        "description": "Pets are not allowed",
                        "title": "Pets",
                        "type": "POLICY_HOTEL_PETS",
                        "icon": "petfriendly"
                    },
                    {
                        "description": "Parties/events are not allowed.",
                        "title": "Parties",
                        "icon": "fooddrink",
                        "type": "POLICY_PARTIES"
                    },
                    {
                        "type": "POLICY_QUIET_HOURS",
                        "icon": "halfmoon",
                        "description": "Quiet hours are between 10:00 PM and 8:00 AM.",
                        "title": "Quiet hours"
                    }
                ],
                "is_vacation_rental": 1,
                "group": "apartment_like",
                "is_aparthotel": 1,
                "segment": 1,
                "quality_class": null
            },
            "aggregated_data": {
                "has_kitchen": 1,
                "has_seating": 1,
                "common_kitchen_fac": [
                    {
                        "name": "Microwave",
                        "id": 32
                    },
                    {
                        "name": "Kitchenware",
                        "id": 89
                    },
                    {
                        "id": 116,
                        "name": "Cleaning products"
                    },
                    {
                        "id": 126,
                        "name": "Dining table"
                    },
                    {
                        "name": "Refrigerator",
                        "id": 22
                    },
                    {
                        "id": 97,
                        "name": "Stovetop"
                    },
                    {
                        "name": "Electric kettle",
                        "id": 86
                    },
                    {
                        "id": 45,
                        "name": "Kitchen"
                    },
                    {
                        "name": "High chair",
                        "id": 127
                    }
                ],
                "has_refundable": 0,
                "has_nonrefundable": 1
            },
            "last_reservation": {
                "time": "",
                "country": null,
                "countrycode": null
            },
            "free_facilities_cancel_breakfast": [
                {
                    "facility_id": 46
                }
            ],
            "room_recommendation": [
                {
                    "block_id": "197929304_102416209_3_0_0_240561",
                    "number_of_extra_babycots": 0,
                    "number_of_extra_beds_for_children": 0,
                    "number_of_extra_beds_for_adults": 0,
                    "babies": 0,
                    "adults": 1,
                    "extra_babycots_price": 0,
                    "number_of_extra_beds_and_babycots_total": 0,
                    "extra_beds_for_children_price": 0,
                    "extra_babycots_price_in_hotel_currency": 0,
                    "children": 0,
                    "extra_beds_for_adults_price": 0,
                    "extra_beds_for_adults_price_in_hotel_currency": 0,
                    "total_extra_bed_price_in_hotel_currency": 0,
                    "extra_beds_for_children_price_in_hotel_currency": 0,
                    "total_extra_bed_price": 0
                }
            ],
            "hotel_text": {},
            "districts": [
                2304,
                10638,
                15685
            ],
            "preferences": [],
            "hotel_important_information_with_codes": [
                {
                    "executing_phase": 0,
                    "sentence_id": 4,
                    "phrase": "Please inform Oxley Thanksgiving Residence of your expected arrival time in advance. You can use the Special Requests box when booking, or contact the property directly using the contact details in your confirmation."
                },
                {
                    "executing_phase": 0,
                    "sentence_id": 3,
                    "phrase": "Guests are required to show a photo ID and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply."
                },
                {
                    "executing_phase": 0,
                    "sentence_id": 28,
                    "phrase": "This property does not accommodate bachelor(ette) or similar parties."
                },
                {
                    "phrase": "",
                    "sentence_id": 34,
                    "executing_phase": 0
                },
                {
                    "phrase": "A damage deposit of SGD 300 is required on arrival. That's about MYR 945. This will be collected as a cash payment. You should be reimbursed on check-out. Your deposit will be refunded in full, in cash, subject to an inspection of the property.",
                    "sentence_id": 8,
                    "executing_phase": 0
                }
            ],
            "rooms": {
                "197929304": {
                    "private_bathroom_highlight": {
                        "has_highlight": 1
                    },
                    "highlights": [
                        {
                            "icon": "wifi",
                            "translated_name": "Free WiFi"
                        },
                        {
                            "translated_name": "Hardwood or parquet floors",
                            "id": 82,
                            "icon": "checkmark"
                        },
                        {
                            "id": 27,
                            "translated_name": "Free toiletries",
                            "icon": "checkmark"
                        },
                        {
                            "icon": "mountains",
                            "id": 81,
                            "translated_name": "View"
                        },
                        {
                            "id": 5,
                            "translated_name": "Bathtub",
                            "icon": "bath"
                        },
                        {
                            "id": 11,
                            "translated_name": "Air conditioning",
                            "icon": "snowflake"
                        },
                        {
                            "icon": "bath",
                            "id": 38,
                            "translated_name": "Private bathroom"
                        },
                        {
                            "translated_name": "Flat-screen TV",
                            "id": 75,
                            "icon": "screen"
                        }
                    ],
                    "children_and_beds_text": {
                        "cribs_and_extra_beds": [
                            {
                                "text": "The price in SGD has been converted to show you the approximate price in MYR.",
                                "highlight": 0
                            },
                            {
                                "text": "Additional fees are not calculated automatically in the total cost and will have to be paid for separately during your stay.",
                                "highlight": 0
                            },
                            {
                                "highlight": 0,
                                "text": "The maximum number of cribs, extra beds, and children allowed in existing beds can vary depending on the option booked."
                            },
                            {
                                "text": "All cribs and extra beds are subject to availability.",
                                "highlight": 0
                            }
                        ],
                        "children_at_the_property": [
                            {
                                "text": "Children of all ages are welcome.",
                                "highlight": 0
                            },
                            {
                                "highlight": 0,
                                "text": "Children 7 and above will be charged as adults at this property."
                            },
                            {
                                "highlight": 1,
                                "text": "To see correct prices and occupancy info, add the number and ages of children in your group to your search."
                            }
                        ],
                        "allow_children": 1,
                        "age_intervals": [
                            {
                                "crib": {
                                    "price_mode": "per_stay",
                                    "price_mode_n": 1,
                                    "price_type": "fixed",
                                    "price_type_n": 2,
                                    "id": 58849848,
                                    "guaranteed": 0,
                                    "price": "MYR 157.62"
                                },
                                "group_by_price": {
                                    "fixed,per_stay,157.62": [
                                        "crib"
                                    ]
                                },
                                "types_by_price": [
                                    [
                                        "crib"
                                    ]
                                ],
                                "min_age": 0,
                                "max_age": 1
                            },
                            {
                                "min_age": 2,
                                "max_age": 2,
                                "types_by_price": [
                                    [
                                        "extra_bed"
                                    ],
                                    [
                                        "crib"
                                    ]
                                ],
                                "extra_bed": {
                                    "price_mode_n": 0,
                                    "price_mode": "per_night",
                                    "id": 58849847,
                                    "price_type_n": 2,
                                    "price_type": "fixed",
                                    "price": "MYR 94.57"
                                },
                                "group_by_price": {
                                    "fixed,per_stay,157.62": [
                                        "crib"
                                    ],
                                    "fixed,per_night,94.57": [
                                        "extra_bed"
                                    ]
                                },
                                "crib": {
                                    "price_mode": "per_stay",
                                    "price_mode_n": 1,
                                    "price_type_n": 2,
                                    "price_type": "fixed",
                                    "id": 58849848,
                                    "price": "MYR 157.62",
                                    "guaranteed": 0
                                }
                            },
                            {
                                "types_by_price": [
                                    [
                                        "extra_bed"
                                    ]
                                ],
                                "min_age": 3,
                                "max_age": 255,
                                "group_by_price": {
                                    "fixed,per_night,94.57": [
                                        "extra_bed"
                                    ]
                                },
                                "extra_bed": {
                                    "price_type_n": 2,
                                    "price_type": "fixed",
                                    "id": 58849847,
                                    "price": "MYR 94.57",
                                    "price_mode_n": 0,
                                    "price_mode": "per_night"
                                }
                            }
                        ]
                    },
                    "cribs_extra_beds": {
                        "extra_beds": {
                            "all_free": 0,
                            "max_count": 1,
                            "ages": [
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                8,
                                9,
                                10,
                                11,
                                12,
                                13,
                                14,
                                15,
                                16,
                                17,
                                255
                            ]
                        }
                    },
                    "photos": [
                        {
                            "ratio": 1.5,
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/830670924.jpg?k=fb51e876fad1bb91f92107f6579b96a709bebb5911a3cb664182e469ddad6e44&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/830670924.jpg?k=fb51e876fad1bb91f92107f6579b96a709bebb5911a3cb664182e469ddad6e44&o=",
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/830670924.jpg?k=fb51e876fad1bb91f92107f6579b96a709bebb5911a3cb664182e469ddad6e44&o=",
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/830670924.jpg?k=fb51e876fad1bb91f92107f6579b96a709bebb5911a3cb664182e469ddad6e44&o=",
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/830670924.jpg?k=fb51e876fad1bb91f92107f6579b96a709bebb5911a3cb664182e469ddad6e44&o=",
                            "photo_id": 830670924,
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/830670924.jpg?k=fb51e876fad1bb91f92107f6579b96a709bebb5911a3cb664182e469ddad6e44&o=",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/830670924.jpg?k=fb51e876fad1bb91f92107f6579b96a709bebb5911a3cb664182e469ddad6e44&o=",
                            "last_update_date": "2026-03-04 12:36:47"
                        },
                        {
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/830670932.jpg?k=5fd1bbac49f20b09f1c72e9c0a77376967bc0df9c3cbfc01889f23960828cccf&o=",
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/830670932.jpg?k=5fd1bbac49f20b09f1c72e9c0a77376967bc0df9c3cbfc01889f23960828cccf&o=",
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/830670932.jpg?k=5fd1bbac49f20b09f1c72e9c0a77376967bc0df9c3cbfc01889f23960828cccf&o=",
                            "photo_id": 830670932,
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/830670932.jpg?k=5fd1bbac49f20b09f1c72e9c0a77376967bc0df9c3cbfc01889f23960828cccf&o=",
                            "last_update_date": "2026-03-04 12:36:48",
                            "ratio": 1.5,
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/830670932.jpg?k=5fd1bbac49f20b09f1c72e9c0a77376967bc0df9c3cbfc01889f23960828cccf&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/830670932.jpg?k=5fd1bbac49f20b09f1c72e9c0a77376967bc0df9c3cbfc01889f23960828cccf&o=",
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/830670932.jpg?k=5fd1bbac49f20b09f1c72e9c0a77376967bc0df9c3cbfc01889f23960828cccf&o="
                        },
                        {
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/830670933.jpg?k=996e10e1a9e2bcfa5d73b9fb9702dad1203ea40942c58c028624a2669a8b7b36&o=",
                            "ratio": 1.5,
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/830670933.jpg?k=996e10e1a9e2bcfa5d73b9fb9702dad1203ea40942c58c028624a2669a8b7b36&o=",
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/830670933.jpg?k=996e10e1a9e2bcfa5d73b9fb9702dad1203ea40942c58c028624a2669a8b7b36&o=",
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/830670933.jpg?k=996e10e1a9e2bcfa5d73b9fb9702dad1203ea40942c58c028624a2669a8b7b36&o=",
                            "photo_id": 830670933,
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/830670933.jpg?k=996e10e1a9e2bcfa5d73b9fb9702dad1203ea40942c58c028624a2669a8b7b36&o=",
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/830670933.jpg?k=996e10e1a9e2bcfa5d73b9fb9702dad1203ea40942c58c028624a2669a8b7b36&o=",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/830670933.jpg?k=996e10e1a9e2bcfa5d73b9fb9702dad1203ea40942c58c028624a2669a8b7b36&o=",
                            "last_update_date": "2026-03-04 12:36:48"
                        },
                        {
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/830670927.jpg?k=7f6e1087a1e1e4958b1d81ee6e27d59773345f6ad7e5424b9a9a9d214a085cc0&o=",
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/830670927.jpg?k=7f6e1087a1e1e4958b1d81ee6e27d59773345f6ad7e5424b9a9a9d214a085cc0&o=",
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/830670927.jpg?k=7f6e1087a1e1e4958b1d81ee6e27d59773345f6ad7e5424b9a9a9d214a085cc0&o=",
                            "photo_id": 830670927,
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/830670927.jpg?k=7f6e1087a1e1e4958b1d81ee6e27d59773345f6ad7e5424b9a9a9d214a085cc0&o=",
                            "last_update_date": "2026-03-04 12:36:47",
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/830670927.jpg?k=7f6e1087a1e1e4958b1d81ee6e27d59773345f6ad7e5424b9a9a9d214a085cc0&o=",
                            "ratio": 0.666666666666667,
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/830670927.jpg?k=7f6e1087a1e1e4958b1d81ee6e27d59773345f6ad7e5424b9a9a9d214a085cc0&o=",
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/830670927.jpg?k=7f6e1087a1e1e4958b1d81ee6e27d59773345f6ad7e5424b9a9a9d214a085cc0&o="
                        },
                        {
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/830670930.jpg?k=31dc0f172613ef5d2f2ef1ffd8b3755053d0c854db65a8d7706104743d73978c&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/830670930.jpg?k=31dc0f172613ef5d2f2ef1ffd8b3755053d0c854db65a8d7706104743d73978c&o=",
                            "ratio": 1.5,
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/830670930.jpg?k=31dc0f172613ef5d2f2ef1ffd8b3755053d0c854db65a8d7706104743d73978c&o=",
                            "last_update_date": "2026-03-04 12:36:47",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/830670930.jpg?k=31dc0f172613ef5d2f2ef1ffd8b3755053d0c854db65a8d7706104743d73978c&o=",
                            "photo_id": 830670930,
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/830670930.jpg?k=31dc0f172613ef5d2f2ef1ffd8b3755053d0c854db65a8d7706104743d73978c&o=",
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/830670930.jpg?k=31dc0f172613ef5d2f2ef1ffd8b3755053d0c854db65a8d7706104743d73978c&o=",
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/830670930.jpg?k=31dc0f172613ef5d2f2ef1ffd8b3755053d0c854db65a8d7706104743d73978c&o="
                        },
                        {
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/830670926.jpg?k=9cada855e7473e636180b71f24e4fc8ee77e2f1e409594dca88f5a2fce9a1f33&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/830670926.jpg?k=9cada855e7473e636180b71f24e4fc8ee77e2f1e409594dca88f5a2fce9a1f33&o=",
                            "ratio": 1.5,
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/830670926.jpg?k=9cada855e7473e636180b71f24e4fc8ee77e2f1e409594dca88f5a2fce9a1f33&o=",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/830670926.jpg?k=9cada855e7473e636180b71f24e4fc8ee77e2f1e409594dca88f5a2fce9a1f33&o=",
                            "last_update_date": "2026-03-04 12:36:47",
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/830670926.jpg?k=9cada855e7473e636180b71f24e4fc8ee77e2f1e409594dca88f5a2fce9a1f33&o=",
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/830670926.jpg?k=9cada855e7473e636180b71f24e4fc8ee77e2f1e409594dca88f5a2fce9a1f33&o=",
                            "photo_id": 830670926,
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/830670926.jpg?k=9cada855e7473e636180b71f24e4fc8ee77e2f1e409594dca88f5a2fce9a1f33&o="
                        },
                        {
                            "photo_id": 830670928,
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/830670928.jpg?k=44827fd4a3fa07157f3a83b5e0597e2c71d443306adbbb2fe3bd9398dab91458&o=",
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/830670928.jpg?k=44827fd4a3fa07157f3a83b5e0597e2c71d443306adbbb2fe3bd9398dab91458&o=",
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/830670928.jpg?k=44827fd4a3fa07157f3a83b5e0597e2c71d443306adbbb2fe3bd9398dab91458&o=",
                            "last_update_date": "2026-03-04 12:36:47",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/830670928.jpg?k=44827fd4a3fa07157f3a83b5e0597e2c71d443306adbbb2fe3bd9398dab91458&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/830670928.jpg?k=44827fd4a3fa07157f3a83b5e0597e2c71d443306adbbb2fe3bd9398dab91458&o=",
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/830670928.jpg?k=44827fd4a3fa07157f3a83b5e0597e2c71d443306adbbb2fe3bd9398dab91458&o=",
                            "ratio": 0.666666666666667,
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/830670928.jpg?k=44827fd4a3fa07157f3a83b5e0597e2c71d443306adbbb2fe3bd9398dab91458&o="
                        }
                    ],
                    "private_bathroom_count": 1,
                    "description": "Featuring a private entrance, this air-conditioned apartment consists of 1 living room, 1 separate bedroom and 1 bathroom with a bath and a shower. In the fully equipped kitchen, guests will find a stovetop, a refrigerator, kitchenware and a microwave. This wheelchair accessible apartment features a washing machine, a seating area with a flat-screen TV and a toilet with grab rails. The unit offers 2 beds.",
                    "bed_configurations": [
                        {
                            "bed_types": [
                                {
                                    "count": 1,
                                    "name_with_count": "1 sofa bed",
                                    "description": "Variable size",
                                    "description_imperial": "Variable size",
                                    "name": "Sofa bed",
                                    "bed_type": 5
                                },
                                {
                                    "description_imperial": "52-59 inches wide",
                                    "description": "131-150 cm wide",
                                    "bed_type": 2,
                                    "name": "Full bed(s)",
                                    "count": 1,
                                    "name_with_count": "1 full bed"
                                }
                            ]
                        }
                    ],
                    "apartment_configuration": [
                        {
                            "room_details": [
                                {
                                    "ensuite_bathroom": 0,
                                    "room_type_translated": "Bedroom",
                                    "room_type": "Bedroom"
                                }
                            ],
                            "apartment_bed_setup": [
                                {
                                    "max_persons": 2,
                                    "ensuite_bathroom": 0,
                                    "description_short": "131–150 cm",
                                    "room_type": "Bedroom",
                                    "apartment_room_id": 176411410,
                                    "name_withnumber": "1 full bed",
                                    "description": "131-150 cm wide",
                                    "name": "Full bed(s)",
                                    "room_id": 197929304,
                                    "name_alternative": "",
                                    "desc_imperial": "52-59 inches wide",
                                    "bed_count": 1,
                                    "bedtype_id": 2,
                                    "desc_imperial_short": "52–59\""
                                }
                            ]
                        },
                        {
                            "room_details": [
                                {
                                    "room_type": "Living Room",
                                    "room_type_translated": "Living room",
                                    "ensuite_bathroom": 0
                                }
                            ],
                            "apartment_bed_setup": [
                                {
                                    "bedtype_id": 5,
                                    "desc_imperial_short": "",
                                    "bed_count": 1,
                                    "desc_imperial": "Variable size",
                                    "name": "Sofa bed",
                                    "room_id": 197929304,
                                    "name_alternative": "",
                                    "description": "Variable size",
                                    "name_withnumber": "1 sofa bed",
                                    "room_type": "Living Room",
                                    "apartment_room_id": 176411411,
                                    "max_persons": 1,
                                    "ensuite_bathroom": 0,
                                    "description_short": ""
                                }
                            ]
                        }
                    ],
                    "facilities": [
                        {
                            "name": "Safe",
                            "alt_facilitytype_id": 1,
                            "alt_facilitytype_name": "General",
                            "id": 6,
                            "facilitytype_id": 4
                        },
                        {
                            "name": "Hardwood or parquet floors",
                            "alt_facilitytype_name": "General",
                            "alt_facilitytype_id": 1,
                            "facilitytype_id": 4,
                            "id": 82
                        },
                        {
                            "alt_facilitytype_name": "Media & Technology",
                            "alt_facilitytype_id": 6,
                            "name": "Flat-screen TV",
                            "id": 75,
                            "facilitytype_id": 6
                        },
                        {
                            "facilitytype_id": 7,
                            "id": 129,
                            "alt_facilitytype_name": "Outdoors",
                            "alt_facilitytype_id": 13,
                            "name": "Outdoor furniture"
                        },
                        {
                            "id": 15,
                            "facilitytype_id": 4,
                            "alt_facilitytype_name": "General",
                            "alt_facilitytype_id": 1,
                            "name": "Iron"
                        },
                        {
                            "facilitytype_id": 4,
                            "id": 30,
                            "alt_facilitytype_name": "General",
                            "alt_facilitytype_id": 1,
                            "name": "Fan"
                        },
                        {
                            "facilitytype_id": 4,
                            "id": 25,
                            "name": "Ironing facilities",
                            "alt_facilitytype_id": 1,
                            "alt_facilitytype_name": "General"
                        },
                        {
                            "name": "Sitting area",
                            "alt_facilitytype_name": "Living Area",
                            "alt_facilitytype_id": 15,
                            "facilitytype_id": 4,
                            "id": 26
                        },
                        {
                            "id": 27,
                            "facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom",
                            "alt_facilitytype_id": 5,
                            "name": "Free toiletries"
                        },
                        {
                            "name": "Guest bathroom",
                            "alt_facilitytype_name": "Bathroom",
                            "alt_facilitytype_id": 5,
                            "id": 72,
                            "facilitytype_id": 5
                        },
                        {
                            "name": "Fold-up bed",
                            "alt_facilitytype_id": 4,
                            "alt_facilitytype_name": "Room amenities",
                            "id": 139,
                            "facilitytype_id": 4
                        },
                        {
                            "facilitytype_id": 7,
                            "id": 32,
                            "name": "Microwave",
                            "alt_facilitytype_name": "Kitchen",
                            "alt_facilitytype_id": 12
                        },
                        {
                            "id": 8,
                            "facilitytype_id": 6,
                            "name": "TV",
                            "alt_facilitytype_name": "Media & Technology",
                            "alt_facilitytype_id": 6
                        },
                        {
                            "alt_facilitytype_name": "Bedroom",
                            "alt_facilitytype_id": 17,
                            "name": "Linens",
                            "id": 125,
                            "facilitytype_id": 8
                        },
                        {
                            "alt_facilitytype_id": 1,
                            "alt_facilitytype_name": "General",
                            "name": "Private entrance",
                            "id": 76,
                            "facilitytype_id": 4
                        },
                        {
                            "name": "Kitchenware",
                            "alt_facilitytype_name": "Kitchen",
                            "alt_facilitytype_id": 12,
                            "facilitytype_id": 7,
                            "id": 89
                        },
                        {
                            "name": "Sofa bed",
                            "alt_facilitytype_name": "Room amenities",
                            "alt_facilitytype_id": 4,
                            "id": 146,
                            "facilitytype_id": 4
                        },
                        {
                            "facilitytype_id": 4,
                            "id": 94,
                            "name": "Dryer",
                            "alt_facilitytype_id": 12,
                            "alt_facilitytype_name": "Kitchen"
                        },
                        {
                            "facilitytype_id": 4,
                            "id": 34,
                            "alt_facilitytype_name": "Kitchen",
                            "alt_facilitytype_id": 12,
                            "name": "Washing machine"
                        },
                        {
                            "facilitytype_id": 6,
                            "id": 68,
                            "name": "Cable channels",
                            "alt_facilitytype_id": 6,
                            "alt_facilitytype_name": "Media & Technology"
                        },
                        {
                            "name": "Cleaning products",
                            "alt_facilitytype_name": "Kitchen",
                            "alt_facilitytype_id": 12,
                            "id": 116,
                            "facilitytype_id": 4
                        },
                        {
                            "id": 141,
                            "facilitytype_id": 5,
                            "name": "Toilet paper",
                            "alt_facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom"
                        },
                        {
                            "id": 11,
                            "facilitytype_id": 4,
                            "alt_facilitytype_name": "General",
                            "alt_facilitytype_id": 1,
                            "name": "Air conditioning"
                        },
                        {
                            "id": 5,
                            "facilitytype_id": 5,
                            "name": "Bathtub",
                            "alt_facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom"
                        },
                        {
                            "facilitytype_id": 7,
                            "id": 126,
                            "alt_facilitytype_id": 12,
                            "alt_facilitytype_name": "Kitchen",
                            "name": "Dining table"
                        },
                        {
                            "id": 132,
                            "facilitytype_id": 19,
                            "name": "Upper floors accessible by elevator",
                            "alt_facilitytype_id": 19,
                            "alt_facilitytype_name": "Accessibility"
                        },
                        {
                            "facilitytype_id": 37,
                            "id": 215,
                            "alt_facilitytype_id": 37,
                            "alt_facilitytype_name": "Safety features",
                            "name": "Air purifiers"
                        },
                        {
                            "facilitytype_id": 4,
                            "id": 77,
                            "name": "Sofa",
                            "alt_facilitytype_id": 15,
                            "alt_facilitytype_name": "Living Area"
                        },
                        {
                            "id": 140,
                            "facilitytype_id": 4,
                            "name": "Drying rack for clothing",
                            "alt_facilitytype_name": "Room amenities",
                            "alt_facilitytype_id": 4
                        },
                        {
                            "facilitytype_id": 8,
                            "id": 124,
                            "alt_facilitytype_name": "Bathroom",
                            "alt_facilitytype_id": 5,
                            "name": "Towels"
                        },
                        {
                            "name": "Entire unit wheelchair accessible",
                            "alt_facilitytype_name": "Accessibility",
                            "alt_facilitytype_id": 19,
                            "facilitytype_id": 19,
                            "id": 134
                        },
                        {
                            "alt_facilitytype_id": 20,
                            "alt_facilitytype_name": "Building Characteristics",
                            "name": "Private apartment in building",
                            "facilitytype_id": 20,
                            "id": 137
                        },
                        {
                            "alt_facilitytype_id": 4,
                            "alt_facilitytype_name": "Room amenities",
                            "name": "Socket near the bed",
                            "facilitytype_id": 4,
                            "id": 184
                        },
                        {
                            "name": "Hairdryer",
                            "alt_facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom",
                            "facilitytype_id": 5,
                            "id": 12
                        },
                        {
                            "facilitytype_id": 9,
                            "id": 81,
                            "alt_facilitytype_id": 14,
                            "alt_facilitytype_name": "View",
                            "name": "View"
                        },
                        {
                            "facilitytype_id": 7,
                            "id": 22,
                            "name": "Refrigerator",
                            "alt_facilitytype_name": "Kitchen",
                            "alt_facilitytype_id": 12
                        },
                        {
                            "alt_facilitytype_id": 12,
                            "alt_facilitytype_name": "Kitchen",
                            "name": "Stovetop",
                            "facilitytype_id": 7,
                            "id": 97
                        },
                        {
                            "id": 31,
                            "facilitytype_id": 5,
                            "name": "Toilet",
                            "alt_facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom"
                        },
                        {
                            "facilitytype_id": 7,
                            "id": 16,
                            "name": "Kitchenette",
                            "alt_facilitytype_id": 12,
                            "alt_facilitytype_name": "Kitchen"
                        },
                        {
                            "id": 86,
                            "facilitytype_id": 7,
                            "name": "Electric kettle",
                            "alt_facilitytype_id": 12,
                            "alt_facilitytype_name": "Kitchen"
                        },
                        {
                            "id": 45,
                            "facilitytype_id": 7,
                            "name": "Kitchen",
                            "alt_facilitytype_id": 12,
                            "alt_facilitytype_name": "Kitchen"
                        },
                        {
                            "name": "Single-room AC for guest accommodation",
                            "alt_facilitytype_id": 39,
                            "alt_facilitytype_name": "Physical distancing",
                            "id": 230,
                            "facilitytype_id": 39
                        },
                        {
                            "name": "Shower",
                            "alt_facilitytype_name": "Bathroom",
                            "alt_facilitytype_id": 5,
                            "facilitytype_id": 5,
                            "id": 4
                        },
                        {
                            "facilitytype_id": 4,
                            "id": 95,
                            "alt_facilitytype_id": 17,
                            "alt_facilitytype_name": "Bedroom",
                            "name": "Wardrobe or closet"
                        },
                        {
                            "id": 127,
                            "facilitytype_id": 7,
                            "name": "High chair",
                            "alt_facilitytype_id": 12,
                            "alt_facilitytype_name": "Kitchen"
                        },
                        {
                            "alt_facilitytype_name": "Living Area",
                            "alt_facilitytype_id": 15,
                            "name": "Dining area",
                            "id": 85,
                            "facilitytype_id": 7
                        },
                        {
                            "id": 231,
                            "facilitytype_id": 40,
                            "alt_facilitytype_name": "Cleanliness & disinfection",
                            "alt_facilitytype_id": 40,
                            "name": "Hand sanitizer"
                        },
                        {
                            "id": 38,
                            "facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom",
                            "alt_facilitytype_id": 5,
                            "name": "Private bathroom"
                        }
                    ]
                }
            },
            "block": [
                {
                    "room_count": 4,
                    "roomtype_id": 1,
                    "breakfast_included": 0,
                    "number_of_bathrooms": 1,
                    "room_name": "Deluxe One-Bedroom Apartment",
                    "max_children_free": 0,
                    "bundle_extras": {
                        "icon": "",
                        "highlighted_text": "Includes 1 parking spot + high-speed internet ",
                        "has_rich_content": "",
                        "bundle_id": 240561,
                        "generated_name": "Parking + high-speed internet ",
                        "benefits": [
                            {
                                "catalog_item_id": 1,
                                "title": "Parking",
                                "details": [
                                    "Self parking for one vehicle per booked unit per stay."
                                ],
                                "category": "parking",
                                "name": "Parking",
                                "icon": "558819"
                            },
                            {
                                "icon": "558820",
                                "name": "Internet",
                                "category": "internet",
                                "details": [
                                    "High-speed internet throughout your stay."
                                ],
                                "title": "High-speed internet",
                                "catalog_item_id": 18
                            }
                        ],
                        "rich_value_add_page_title": "",
                        "rich_footer": [
                            "Contact the property to arrange this service.",
                            "All additional services are the responsibility of the property.",
                            "Any unused products and services included in the rate are non-refundable."
                        ],
                        "experiments": [
                            {
                                "stages": [
                                    "1",
                                    "3"
                                ],
                                "tag": "ios_value_adds_copy_experiment_3"
                            }
                        ]
                    },
                    "babycots_available": 0,
                    "full_board": 0,
                    "is_flash_deal": 0,
                    "name_without_policy": "Deluxe One-Bedroom Apartment",
                    "half_board": 0,
                    "nr_adults": 3,
                    "can_reserve_free_parking": 1,
                    "extrabed_available": 0,
                    "is_domestic_rate": 0,
                    "block_text": {
                        "policies": [
                            {
                                "class": "POLICY_CANCELLATION",
                                "content": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation."
                            },
                            {
                                "class": "POLICY_PREPAY",
                                "content": "The total price of the reservation is charged at the time of booking."
                            },
                            {
                                "class": "POLICY_TITLE",
                                "content": "Non Refundable"
                            }
                        ]
                    },
                    "pay_in_advance": 1,
                    "package_id": 0,
                    "smoking": 0,
                    "name": "Deluxe One-Bedroom Apartment - Non-refundable",
                    "max_children_free_age": 7,
                    "is_smart_deal": 0,
                    "room_surface_in_feet2": 398.2646848,
                    "deposit_required": 1,
                    "is_last_minute_deal": 0,
                    "block_id": "197929304_102416209_3_0_0_240561",
                    "pod_ios_migrate_policies_to_smp_fullon": 0,
                    "max_occupancy": "3",
                    "room_surface_in_m2": 37,
                    "fit_occupancy": {
                        "nr_adults": 1,
                        "children_ages": []
                    },
                    "room_id": 197929304,
                    "babycots_available_amount": null,
                    "children_ages": [],
                    "number_of_bedrooms": 1,
                    "is_block_fit": "",
                    "extrabed_available_amount": null,
                    "nr_children": 0,
                    "fit_status": 0,
                    "paymentterms": {
                        "prepayment": {
                            "description": "You'll be charged a prepayment of the total price at any time.",
                            "type_extended": "non_refundable_prepayment",
                            "type": "full_prepayment",
                            "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                            "type_translation": "SECURE YOUR BOOKING – pay now",
                            "simple_translation": "Prepayment",
                            "info": {
                                "is_midnight": null,
                                "date": null,
                                "time": null,
                                "prepayment_at_booktime": 0,
                                "time_before_midnight": null,
                                "refundable": 0,
                                "date_before": null,
                                "timezone": null,
                                "timezone_offset": null
                            }
                        },
                        "cancellation": {
                            "guaranteed_non_refundable": 0,
                            "non_refundable_anymore": 0,
                            "bucket": "SMP_NON_REF",
                            "info": {
                                "date_before": null,
                                "is_midnight": null,
                                "time_before_midnight": null,
                                "date_before_raw": null,
                                "refundable": 0,
                                "timezone": null,
                                "refundable_date": null,
                                "timezone_offset": null,
                                "date": null,
                                "time": null,
                                "date_raw": null
                            },
                            "type_translation": "Non-refundable",
                            "type": "non_refundable",
                            "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged."
                        }
                    },
                    "mealplan": "There is no meal option with this room.",
                    "all_inclusive": 0,
                    "bh_room_highlights": [
                        {
                            "context": 5,
                            "icon_list": [
                                {
                                    "size": 1,
                                    "icon": "door_open"
                                }
                            ],
                            "name": "1 bedroom"
                        },
                        {
                            "icon_list": [
                                {
                                    "size": 1,
                                    "icon": "room_size"
                                }
                            ],
                            "context": 5,
                            "name": "37 m²"
                        },
                        {
                            "name": "Living Room",
                            "context": 4,
                            "icon_list": [
                                {
                                    "size": 1,
                                    "icon": "couch"
                                }
                            ]
                        },
                        {
                            "context": 4,
                            "icon_list": [
                                {
                                    "icon": "oven",
                                    "size": 1
                                }
                            ],
                            "name": "Kitchen"
                        },
                        {
                            "context": 4,
                            "icon_list": [
                                {
                                    "icon": "eye",
                                    "size": 1
                                }
                            ],
                            "name": "View"
                        }
                    ],
                    "refundable_until": "",
                    "genius_discount_percentage": 0,
                    "refundable": 0,
                    "must_reserve_free_parking": 1
                }
            ],
            "rawData": {
                "position": 0,
                "checkinDate": "2026-07-02",
                "propertyClass": 4,
                "reviewCount": 2136,
                "longitude": 103.840715979208,
                "mainPhotoId": 232647637,
                "latitude": 1.2963220381347,
                "qualityClass": 0,
                "photoUrls": [
                    "https://cf.bstatic.com/xdata/images/hotel/square60/232647637.jpg?k=f13f4d2770f5813b223d257748739c69effcd94e6df5247323c599e6b861b3cc&o="
                ],
                "isSoldout": true,
                "checkin": {
                    "fromTime": "15:00",
                    "untilTime": "00:00"
                },
                "checkout": {
                    "fromTime": "07:00",
                    "untilTime": "12:00"
                },
                "isFirstPage": true,
                "reviewScore": 8.3,
                "rankingPosition": 0,
                "checkoutDate": "2026-07-03",
                "id": 1979293,
                "isHighlightedHotel": true,
                "currency": "",
                "name": "Oxley Thanksgiving Residence",
                "optOutFromGalleryChanges": 1,
                "accuratePropertyClass": 4,
                "reviewScoreWord": "Very good",
                "blockIds": [],
                "wishlistName": "Singapore",
                "countryCode": "sg",
                "ufi": -73635
            }
        }
    }
}