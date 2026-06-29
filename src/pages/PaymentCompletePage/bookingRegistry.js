export const success = 'http://localhost:5173/paymentcomplete?payment_intent=pi_3TmPdyB8sQTyWY5y0JXoPY5Y&payment_intent_client_secret=pi_3TmPdyB8sQTyWY5y0JXoPY5Y_secret_DYeyiY2DMFsRoZavHD4nR5mdw&redirect_status=succeeded'

export const bookingRegistry = {
    "booking_registry_code": "BK-27229-04072026-12072026",
    "main_guest_name": {
        "guest_booking_for_type": "mainGuest",
        "first_name": "Lewis",
        "last_name": "Keen Marcusia "
    },
    "country_region": {
        "country_code": "AD",
        "country_name": {
            "code": "AD",
            "name": "Andorra",
            "phoneCode": "+376"
        }
    },
    "email": "123@gmail.com",
    "phone": {
        "country_region": "+20",
        "phone_number": "127542211"
    },
    "company": {
        "is_Company_Business": false,
        "company_data": {
            "company_name": "",
            "company_reg_num": ""
        }
    },
    "main_hotel_booked": {
        "main_hotel_name": "Ambassador Hotel Bangkok",
        "main_hotel_address": "171 Sukhumvit Road Soi 11",
        "checking_start_end_time": {
            "check_in_date": "04 Jul 2026",
            "check_out_date": "12 Jul 2026",
            "total_days": 8
        },
        "guest": {
            "adults": 1,
            "childs": 0
        },
        "total_cost": {
            "grand_total_cost": 9787.68,
            "grand_total_cost_deceimal": 978768,
            "currency": "MYR"
        },
        "select_room_offers": [
            {
                "base_room_id": 2723042,
                "base_room_name": "Superior Double Bed Sky Wing",
                "base_room_surface_m2": 35,
                "base_main_photos": "https://cf.bstatic.com/xdata/images/hotel/square60/402405626.jpg?k=d1ccd478bcab78fa70342997206068918e217dbb94a523ca21343549af3da9f2&o=",
                "base_select_room_total_amount": 4,
                "base_select_room": [
                    {
                        "block_id": "2723042_95150930_2_2_0_1209259",
                        "spec_room_data": {
                            "paymentterms": {
                                "prepayment": {
                                    "type": "full_prepayment",
                                    "info": {
                                        "refundable": 0,
                                        "is_midnight": null,
                                        "time_before_midnight": null,
                                        "prepayment_at_booktime": 0,
                                        "timezone": null,
                                        "date_before": null,
                                        "date": null,
                                        "time": null,
                                        "timezone_offset": null
                                    },
                                    "simple_translation": "Prepayment",
                                    "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                                    "type_extended": "non_refundable_prepayment",
                                    "description": "You'll be charged a prepayment of the total price at any time.",
                                    "type_translation": "SECURE YOUR BOOKING – pay now"
                                },
                                "cancellation": {
                                    "guaranteed_non_refundable": 0,
                                    "type_translation": "Non-refundable",
                                    "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged.",
                                    "non_refundable_anymore": 0,
                                    "type": "non_refundable",
                                    "bucket": "SMP_NON_REF",
                                    "info": {
                                        "refundable": 0,
                                        "is_midnight": null,
                                        "timezone": null,
                                        "date_before_raw": null,
                                        "date": null,
                                        "refundable_date": null,
                                        "timezone_offset": null,
                                        "time": null,
                                        "time_before_midnight": null,
                                        "date_before": null,
                                        "date_raw": null
                                    }
                                }
                            },
                            "pay_in_advance": 1,
                            "is_smart_deal": 0,
                            "room_id": 2723042,
                            "babycots_available": 0,
                            "fit_status": 2,
                            "nr_one_free_date_change": {
                                "policy_short": "Flexible to reschedule if plans change",
                                "date_change_until": "July 1, 2026",
                                "policy_long": "However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                            },
                            "roomtype_id": 9,
                            "children_ages": [],
                            "transactional_policy_data": {
                                "applied_products": [
                                    "pay_in_follows_policy"
                                ],
                                "booking_conditions": [
                                    {
                                        "policy_type_key": "pbb_at_booking_time",
                                        "type": "prepayment",
                                        "text": "Prepayment",
                                        "icon": "credit_card",
                                        "key": "VP2PayInAdvanceKey",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    },
                                    {
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": "stop",
                                        "key": "NonRefundableKey",
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    }
                                ],
                                "policies": [
                                    {
                                        "icon": "checkmark",
                                        "policy_type_key": "flexible_to_reschedule",
                                        "type": "reschedule",
                                        "text": "Flexible to reschedule if plans change",
                                        "key": "NrOneFreeDateChangeKey"
                                    },
                                    {
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": null,
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "key": "NonRefundableKey"
                                    },
                                    {
                                        "icon": "credit_card_back",
                                        "policy_type_key": "pbb_at_booking_time",
                                        "type": "prepayment",
                                        "text": "Pay online",
                                        "key": "VP2PayInAdvanceKey",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    }
                                ]
                            },
                            "paymentterms_id": 1,
                            "is_flash_deal": 0,
                            "number_of_bathrooms": 0,
                            "nr_children": 0,
                            "half_board": 0,
                            "package_id": 0,
                            "full_board": 0,
                            "is_dormitory": 0,
                            "nr_adults": 2,
                            "depositterms_id": 1,
                            "bundle_extras": {
                                "icon": "",
                                "benefits": [
                                    {
                                        "category": "parking",
                                        "icon": "2444079",
                                        "title": "Parking",
                                        "name": "Parking",
                                        "details": [
                                            "Self parking for one vehicle per booked unit per stay."
                                        ],
                                        "catalog_item_id": 1
                                    },
                                    {
                                        "category": "flexible_checkin_out",
                                        "name": "Front desk services",
                                        "title": "Early check-in",
                                        "icon": "2444080",
                                        "catalog_item_id": 12,
                                        "details": [
                                            "Early check-in from 11:00."
                                        ]
                                    },
                                    {
                                        "category": "internet",
                                        "icon": "2444081",
                                        "name": "Internet",
                                        "title": "High-speed internet",
                                        "catalog_item_id": 18,
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
                                "has_rich_content": "",
                                "highlighted_text": "Includes 1 parking spot + early check-in + high-speed internet",
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
                                "generated_name": "Parking + early check-in + high-speed internet",
                                "bundle_id": 1209259
                            },
                            "room_count": 20,
                            "transactional_policy_objects": [
                                {
                                    "text": "Flexible to reschedule if plans change",
                                    "key": "NrOneFreeDateChangeKey",
                                    "icon": "checkmark"
                                },
                                {
                                    "icon": null,
                                    "key": "NonRefundableKey",
                                    "text": "Non-refundable"
                                },
                                {
                                    "icon": "credit_card_back",
                                    "text": "Pay online",
                                    "key": "VP2PayInAdvanceKey"
                                }
                            ],
                            "babycots_available_amount": null,
                            "all_inclusive": 0,
                            "room_surface_in_m2": 35,
                            "bh_room_highlights": [],
                            "refundable": 0,
                            "block_id": "2723042_95150930_2_2_0_1209259",
                            "fit_occupancy": {
                                "children_ages": [],
                                "nr_adults": 1
                            },
                            "refundable_until": "",
                            "room_name": "Superior Double Bed Sky Wing",
                            "max_children_free": 0,
                            "cfar_data": {
                                "is_applied": 0
                            },
                            "room_surface_in_feet2": 376.736864,
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
                                        "content": "Breakfast MYR 65",
                                        "mealplan_vector": "2",
                                        "class": "POLICY_HOTEL_MEALPLAN"
                                    },
                                    {
                                        "class": "POLICY_TITLE",
                                        "content": "Non Refundable"
                                    }
                                ]
                            },
                            "max_children_free_age": 0,
                            "smoking": 0,
                            "deposit_required": 1,
                            "name_without_policy": "Superior Double Bed Sky Wing",
                            "nr_stays": 10,
                            "is_block_fit": 1,
                            "must_reserve_free_parking": 0,
                            "is_vp2_enrolled": 1,
                            "extrabed_available": 0,
                            "extrabed_available_amount": null,
                            "is_last_minute_deal": 0,
                            "mealplan": "Breakfast MYR 65",
                            "can_reserve_free_parking": 1,
                            "name": "Superior Double Bed Sky Wing - Non-refundable",
                            "breakfast_included": 0,
                            "genius_discount_percentage": 0,
                            "b_bsb_campaigns": [],
                            "max_occupancy": 2,
                            "policy_display_details": {
                                "cancellation": {
                                    "parameters": {
                                        "has_cancellation_fee": 1
                                    },
                                    "is_cost_to_cancel": 0,
                                    "description_details": {
                                        "translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "placeholder_translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    },
                                    "title_details": {
                                        "placeholder_translation": "Non-refundable",
                                        "translation": "Non-refundable",
                                        "tag": "cxl_nr_name"
                                    },
                                    "type": "non_refundable",
                                    "policy_type_key": "non_refundable"
                                },
                                "prepayment": {
                                    "description_details": {
                                        "translation": "The total price of the reservation is charged at the time of booking.",
                                        "placeholder_translation": "The total price of the reservation is charged at the time of booking."
                                    },
                                    "policy_type_key": "pbb_at_booking_time",
                                    "type": "partial_prepayment",
                                    "title_details": {
                                        "tag": "payment_pay_online_name",
                                        "translation": "Pay online",
                                        "placeholder_translation": "Pay online"
                                    }
                                },
                                "reschedule": {
                                    "title_details": {
                                        "placeholder_translation": "Flexible to reschedule if plans change",
                                        "translation": "Flexible to reschedule if plans change",
                                        "tag": "tpex_rm_nr_flex_to_reschedule"
                                    }
                                },
                                "applied_products": [
                                    "pay_in_follows_policy"
                                ]
                            },
                            "product_price_breakdown": {
                                "all_inclusive_amount_hotel_currency": {
                                    "amount_unrounded": "THB 19,822",
                                    "value": 19822,
                                    "amount_rounded": "THB 19,822",
                                    "currency": "THB"
                                },
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
                                        "key": "use_js_tracking",
                                        "value": 1
                                    }
                                ],
                                "strikethrough_amount": {
                                    "amount_rounded": "MYR 5,432",
                                    "amount_unrounded": "MYR 5,431.57",
                                    "value": 5431.56955120815,
                                    "currency": "MYR"
                                },
                                "net_amount": {
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 2,091.39",
                                    "value": 2091.3864027466,
                                    "amount_rounded": "MYR 2,091"
                                },
                                "has_long_stays_weekly_rate_price": 0,
                                "strikethrough_amount_per_night": {
                                    "value": 678.946193901019,
                                    "amount_unrounded": "MYR 678.95",
                                    "amount_rounded": "MYR 679",
                                    "currency": "MYR"
                                },
                                "discounted_amount": {
                                    "currency": "MYR",
                                    "value": 2984.64746838888,
                                    "amount_unrounded": "MYR 2,984.65",
                                    "amount_rounded": "MYR 2,985"
                                },
                                "items": [
                                    {
                                        "details": "7 % VAT",
                                        "base": {
                                            "kind": "percentage",
                                            "percentage": 7
                                        },
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 146.397044735808,
                                            "amount_rounded": "MYR 146",
                                            "amount_unrounded": "MYR 146.40"
                                        },
                                        "kind": "charge",
                                        "inclusion_type": "included",
                                        "name": "VAT"
                                    },
                                    {
                                        "details": "10 % Service charge",
                                        "kind": "charge",
                                        "inclusion_type": "included",
                                        "name": "Service charge",
                                        "item_amount": {
                                            "value": 209.138635336869,
                                            "amount_rounded": "MYR 209",
                                            "amount_unrounded": "MYR 209.14",
                                            "currency": "MYR"
                                        },
                                        "base": {
                                            "percentage": 10,
                                            "kind": "percentage"
                                        }
                                    },
                                    {
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 2552.83768906783,
                                            "amount_rounded": "MYR 2,553",
                                            "amount_unrounded": "MYR 2,552.84"
                                        },
                                        "base": {
                                            "kind": "rate"
                                        },
                                        "name": "Bonus savings",
                                        "kind": "discount",
                                        "identifier": "basic-deal",
                                        "details": "You’re getting a reduced rate because this property is offering a discount."
                                    },
                                    {
                                        "kind": "discount",
                                        "identifier": "mobile-discount",
                                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                                        "base": {
                                            "kind": "rate"
                                        },
                                        "item_amount": {
                                            "amount_rounded": "MYR 432",
                                            "value": 431.809779321048,
                                            "amount_unrounded": "MYR 431.81",
                                            "currency": "MYR"
                                        },
                                        "name": "Mobile-only price"
                                    }
                                ],
                                "gross_amount": {
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 2,446.92",
                                    "value": 2446.92208281927,
                                    "amount_rounded": "MYR 2,447"
                                },
                                "all_inclusive_amount": {
                                    "amount_rounded": "MYR 2,447",
                                    "value": 2446.92208281927,
                                    "amount_unrounded": "MYR 2,446.92",
                                    "currency": "MYR"
                                },
                                "charges_details": {
                                    "mode": "all_included",
                                    "amount": {
                                        "value": 0,
                                        "currency": "MYR"
                                    },
                                    "translated_copy": "Includes taxes and fees"
                                },
                                "benefits": [
                                    {
                                        "badge_variant": "constructive",
                                        "icon": null,
                                        "kind": "badge",
                                        "name": "MYR 2,985 off",
                                        "identifier": "combined-discount",
                                        "details": "You’re getting MYR 2,985 off the original price due to multiple deals and benefits."
                                    },
                                    {
                                        "icon": null,
                                        "kind": "badge",
                                        "identifier": "mobile-rate",
                                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                                        "badge_variant": "constructive",
                                        "name": "Mobile-only price"
                                    }
                                ],
                                "included_taxes_and_charges_amount": {
                                    "value": 355.535680072677,
                                    "amount_rounded": "MYR 356",
                                    "amount_unrounded": "MYR 355.54",
                                    "currency": "MYR"
                                },
                                "gross_amount_hotel_currency": {
                                    "currency": "THB",
                                    "value": 19822,
                                    "amount_unrounded": "THB 19,822",
                                    "amount_rounded": "THB 19,822"
                                },
                                "has_long_stays_monthly_rate_price": 0,
                                "excluded_amount": {
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 0",
                                    "value": 0,
                                    "amount_unrounded": "MYR 0"
                                },
                                "gross_amount_per_night": {
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 306",
                                    "value": 305.865260352409,
                                    "amount_unrounded": "MYR 305.87"
                                },
                                "nr_stays": 10
                            }
                        },
                        "main_guest_name": "Lewis Keen Marcusia ",
                        "repeatIndex": 0,
                        "uniqueKey": "2723042_95150930_2_2_0_1209259-0"
                    },
                    {
                        "block_id": "2723042_95150930_2_2_0_1209259",
                        "spec_room_data": {
                            "paymentterms": {
                                "prepayment": {
                                    "type": "full_prepayment",
                                    "info": {
                                        "refundable": 0,
                                        "is_midnight": null,
                                        "time_before_midnight": null,
                                        "prepayment_at_booktime": 0,
                                        "timezone": null,
                                        "date_before": null,
                                        "date": null,
                                        "time": null,
                                        "timezone_offset": null
                                    },
                                    "simple_translation": "Prepayment",
                                    "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                                    "type_extended": "non_refundable_prepayment",
                                    "description": "You'll be charged a prepayment of the total price at any time.",
                                    "type_translation": "SECURE YOUR BOOKING – pay now"
                                },
                                "cancellation": {
                                    "guaranteed_non_refundable": 0,
                                    "type_translation": "Non-refundable",
                                    "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged.",
                                    "non_refundable_anymore": 0,
                                    "type": "non_refundable",
                                    "bucket": "SMP_NON_REF",
                                    "info": {
                                        "refundable": 0,
                                        "is_midnight": null,
                                        "timezone": null,
                                        "date_before_raw": null,
                                        "date": null,
                                        "refundable_date": null,
                                        "timezone_offset": null,
                                        "time": null,
                                        "time_before_midnight": null,
                                        "date_before": null,
                                        "date_raw": null
                                    }
                                }
                            },
                            "pay_in_advance": 1,
                            "is_smart_deal": 0,
                            "room_id": 2723042,
                            "babycots_available": 0,
                            "fit_status": 2,
                            "nr_one_free_date_change": {
                                "policy_short": "Flexible to reschedule if plans change",
                                "date_change_until": "July 1, 2026",
                                "policy_long": "However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                            },
                            "roomtype_id": 9,
                            "children_ages": [],
                            "transactional_policy_data": {
                                "applied_products": [
                                    "pay_in_follows_policy"
                                ],
                                "booking_conditions": [
                                    {
                                        "policy_type_key": "pbb_at_booking_time",
                                        "type": "prepayment",
                                        "text": "Prepayment",
                                        "icon": "credit_card",
                                        "key": "VP2PayInAdvanceKey",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    },
                                    {
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": "stop",
                                        "key": "NonRefundableKey",
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    }
                                ],
                                "policies": [
                                    {
                                        "icon": "checkmark",
                                        "policy_type_key": "flexible_to_reschedule",
                                        "type": "reschedule",
                                        "text": "Flexible to reschedule if plans change",
                                        "key": "NrOneFreeDateChangeKey"
                                    },
                                    {
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": null,
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "key": "NonRefundableKey"
                                    },
                                    {
                                        "icon": "credit_card_back",
                                        "policy_type_key": "pbb_at_booking_time",
                                        "type": "prepayment",
                                        "text": "Pay online",
                                        "key": "VP2PayInAdvanceKey",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    }
                                ]
                            },
                            "paymentterms_id": 1,
                            "is_flash_deal": 0,
                            "number_of_bathrooms": 0,
                            "nr_children": 0,
                            "half_board": 0,
                            "package_id": 0,
                            "full_board": 0,
                            "is_dormitory": 0,
                            "nr_adults": 2,
                            "depositterms_id": 1,
                            "bundle_extras": {
                                "icon": "",
                                "benefits": [
                                    {
                                        "category": "parking",
                                        "icon": "2444079",
                                        "title": "Parking",
                                        "name": "Parking",
                                        "details": [
                                            "Self parking for one vehicle per booked unit per stay."
                                        ],
                                        "catalog_item_id": 1
                                    },
                                    {
                                        "category": "flexible_checkin_out",
                                        "name": "Front desk services",
                                        "title": "Early check-in",
                                        "icon": "2444080",
                                        "catalog_item_id": 12,
                                        "details": [
                                            "Early check-in from 11:00."
                                        ]
                                    },
                                    {
                                        "category": "internet",
                                        "icon": "2444081",
                                        "name": "Internet",
                                        "title": "High-speed internet",
                                        "catalog_item_id": 18,
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
                                "has_rich_content": "",
                                "highlighted_text": "Includes 1 parking spot + early check-in + high-speed internet",
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
                                "generated_name": "Parking + early check-in + high-speed internet",
                                "bundle_id": 1209259
                            },
                            "room_count": 20,
                            "transactional_policy_objects": [
                                {
                                    "text": "Flexible to reschedule if plans change",
                                    "key": "NrOneFreeDateChangeKey",
                                    "icon": "checkmark"
                                },
                                {
                                    "icon": null,
                                    "key": "NonRefundableKey",
                                    "text": "Non-refundable"
                                },
                                {
                                    "icon": "credit_card_back",
                                    "text": "Pay online",
                                    "key": "VP2PayInAdvanceKey"
                                }
                            ],
                            "babycots_available_amount": null,
                            "all_inclusive": 0,
                            "room_surface_in_m2": 35,
                            "bh_room_highlights": [],
                            "refundable": 0,
                            "block_id": "2723042_95150930_2_2_0_1209259",
                            "fit_occupancy": {
                                "children_ages": [],
                                "nr_adults": 1
                            },
                            "refundable_until": "",
                            "room_name": "Superior Double Bed Sky Wing",
                            "max_children_free": 0,
                            "cfar_data": {
                                "is_applied": 0
                            },
                            "room_surface_in_feet2": 376.736864,
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
                                        "content": "Breakfast MYR 65",
                                        "mealplan_vector": "2",
                                        "class": "POLICY_HOTEL_MEALPLAN"
                                    },
                                    {
                                        "class": "POLICY_TITLE",
                                        "content": "Non Refundable"
                                    }
                                ]
                            },
                            "max_children_free_age": 0,
                            "smoking": 0,
                            "deposit_required": 1,
                            "name_without_policy": "Superior Double Bed Sky Wing",
                            "nr_stays": 10,
                            "is_block_fit": 1,
                            "must_reserve_free_parking": 0,
                            "is_vp2_enrolled": 1,
                            "extrabed_available": 0,
                            "extrabed_available_amount": null,
                            "is_last_minute_deal": 0,
                            "mealplan": "Breakfast MYR 65",
                            "can_reserve_free_parking": 1,
                            "name": "Superior Double Bed Sky Wing - Non-refundable",
                            "breakfast_included": 0,
                            "genius_discount_percentage": 0,
                            "b_bsb_campaigns": [],
                            "max_occupancy": 2,
                            "policy_display_details": {
                                "cancellation": {
                                    "parameters": {
                                        "has_cancellation_fee": 1
                                    },
                                    "is_cost_to_cancel": 0,
                                    "description_details": {
                                        "translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "placeholder_translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    },
                                    "title_details": {
                                        "placeholder_translation": "Non-refundable",
                                        "translation": "Non-refundable",
                                        "tag": "cxl_nr_name"
                                    },
                                    "type": "non_refundable",
                                    "policy_type_key": "non_refundable"
                                },
                                "prepayment": {
                                    "description_details": {
                                        "translation": "The total price of the reservation is charged at the time of booking.",
                                        "placeholder_translation": "The total price of the reservation is charged at the time of booking."
                                    },
                                    "policy_type_key": "pbb_at_booking_time",
                                    "type": "partial_prepayment",
                                    "title_details": {
                                        "tag": "payment_pay_online_name",
                                        "translation": "Pay online",
                                        "placeholder_translation": "Pay online"
                                    }
                                },
                                "reschedule": {
                                    "title_details": {
                                        "placeholder_translation": "Flexible to reschedule if plans change",
                                        "translation": "Flexible to reschedule if plans change",
                                        "tag": "tpex_rm_nr_flex_to_reschedule"
                                    }
                                },
                                "applied_products": [
                                    "pay_in_follows_policy"
                                ]
                            },
                            "product_price_breakdown": {
                                "all_inclusive_amount_hotel_currency": {
                                    "amount_unrounded": "THB 19,822",
                                    "value": 19822,
                                    "amount_rounded": "THB 19,822",
                                    "currency": "THB"
                                },
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
                                        "key": "use_js_tracking",
                                        "value": 1
                                    }
                                ],
                                "strikethrough_amount": {
                                    "amount_rounded": "MYR 5,432",
                                    "amount_unrounded": "MYR 5,431.57",
                                    "value": 5431.56955120815,
                                    "currency": "MYR"
                                },
                                "net_amount": {
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 2,091.39",
                                    "value": 2091.3864027466,
                                    "amount_rounded": "MYR 2,091"
                                },
                                "has_long_stays_weekly_rate_price": 0,
                                "strikethrough_amount_per_night": {
                                    "value": 678.946193901019,
                                    "amount_unrounded": "MYR 678.95",
                                    "amount_rounded": "MYR 679",
                                    "currency": "MYR"
                                },
                                "discounted_amount": {
                                    "currency": "MYR",
                                    "value": 2984.64746838888,
                                    "amount_unrounded": "MYR 2,984.65",
                                    "amount_rounded": "MYR 2,985"
                                },
                                "items": [
                                    {
                                        "details": "7 % VAT",
                                        "base": {
                                            "kind": "percentage",
                                            "percentage": 7
                                        },
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 146.397044735808,
                                            "amount_rounded": "MYR 146",
                                            "amount_unrounded": "MYR 146.40"
                                        },
                                        "kind": "charge",
                                        "inclusion_type": "included",
                                        "name": "VAT"
                                    },
                                    {
                                        "details": "10 % Service charge",
                                        "kind": "charge",
                                        "inclusion_type": "included",
                                        "name": "Service charge",
                                        "item_amount": {
                                            "value": 209.138635336869,
                                            "amount_rounded": "MYR 209",
                                            "amount_unrounded": "MYR 209.14",
                                            "currency": "MYR"
                                        },
                                        "base": {
                                            "percentage": 10,
                                            "kind": "percentage"
                                        }
                                    },
                                    {
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 2552.83768906783,
                                            "amount_rounded": "MYR 2,553",
                                            "amount_unrounded": "MYR 2,552.84"
                                        },
                                        "base": {
                                            "kind": "rate"
                                        },
                                        "name": "Bonus savings",
                                        "kind": "discount",
                                        "identifier": "basic-deal",
                                        "details": "You’re getting a reduced rate because this property is offering a discount."
                                    },
                                    {
                                        "kind": "discount",
                                        "identifier": "mobile-discount",
                                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                                        "base": {
                                            "kind": "rate"
                                        },
                                        "item_amount": {
                                            "amount_rounded": "MYR 432",
                                            "value": 431.809779321048,
                                            "amount_unrounded": "MYR 431.81",
                                            "currency": "MYR"
                                        },
                                        "name": "Mobile-only price"
                                    }
                                ],
                                "gross_amount": {
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 2,446.92",
                                    "value": 2446.92208281927,
                                    "amount_rounded": "MYR 2,447"
                                },
                                "all_inclusive_amount": {
                                    "amount_rounded": "MYR 2,447",
                                    "value": 2446.92208281927,
                                    "amount_unrounded": "MYR 2,446.92",
                                    "currency": "MYR"
                                },
                                "charges_details": {
                                    "mode": "all_included",
                                    "amount": {
                                        "value": 0,
                                        "currency": "MYR"
                                    },
                                    "translated_copy": "Includes taxes and fees"
                                },
                                "benefits": [
                                    {
                                        "badge_variant": "constructive",
                                        "icon": null,
                                        "kind": "badge",
                                        "name": "MYR 2,985 off",
                                        "identifier": "combined-discount",
                                        "details": "You’re getting MYR 2,985 off the original price due to multiple deals and benefits."
                                    },
                                    {
                                        "icon": null,
                                        "kind": "badge",
                                        "identifier": "mobile-rate",
                                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                                        "badge_variant": "constructive",
                                        "name": "Mobile-only price"
                                    }
                                ],
                                "included_taxes_and_charges_amount": {
                                    "value": 355.535680072677,
                                    "amount_rounded": "MYR 356",
                                    "amount_unrounded": "MYR 355.54",
                                    "currency": "MYR"
                                },
                                "gross_amount_hotel_currency": {
                                    "currency": "THB",
                                    "value": 19822,
                                    "amount_unrounded": "THB 19,822",
                                    "amount_rounded": "THB 19,822"
                                },
                                "has_long_stays_monthly_rate_price": 0,
                                "excluded_amount": {
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 0",
                                    "value": 0,
                                    "amount_unrounded": "MYR 0"
                                },
                                "gross_amount_per_night": {
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 306",
                                    "value": 305.865260352409,
                                    "amount_unrounded": "MYR 305.87"
                                },
                                "nr_stays": 10
                            }
                        },
                        "main_guest_name": "",
                        "repeatIndex": 1,
                        "uniqueKey": "2723042_95150930_2_2_0_1209259-1"
                    },
                    {
                        "block_id": "2723042_95150930_2_2_0_1209259",
                        "spec_room_data": {
                            "paymentterms": {
                                "prepayment": {
                                    "type": "full_prepayment",
                                    "info": {
                                        "refundable": 0,
                                        "is_midnight": null,
                                        "time_before_midnight": null,
                                        "prepayment_at_booktime": 0,
                                        "timezone": null,
                                        "date_before": null,
                                        "date": null,
                                        "time": null,
                                        "timezone_offset": null
                                    },
                                    "simple_translation": "Prepayment",
                                    "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                                    "type_extended": "non_refundable_prepayment",
                                    "description": "You'll be charged a prepayment of the total price at any time.",
                                    "type_translation": "SECURE YOUR BOOKING – pay now"
                                },
                                "cancellation": {
                                    "guaranteed_non_refundable": 0,
                                    "type_translation": "Non-refundable",
                                    "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged.",
                                    "non_refundable_anymore": 0,
                                    "type": "non_refundable",
                                    "bucket": "SMP_NON_REF",
                                    "info": {
                                        "refundable": 0,
                                        "is_midnight": null,
                                        "timezone": null,
                                        "date_before_raw": null,
                                        "date": null,
                                        "refundable_date": null,
                                        "timezone_offset": null,
                                        "time": null,
                                        "time_before_midnight": null,
                                        "date_before": null,
                                        "date_raw": null
                                    }
                                }
                            },
                            "pay_in_advance": 1,
                            "is_smart_deal": 0,
                            "room_id": 2723042,
                            "babycots_available": 0,
                            "fit_status": 2,
                            "nr_one_free_date_change": {
                                "policy_short": "Flexible to reschedule if plans change",
                                "date_change_until": "July 1, 2026",
                                "policy_long": "However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                            },
                            "roomtype_id": 9,
                            "children_ages": [],
                            "transactional_policy_data": {
                                "applied_products": [
                                    "pay_in_follows_policy"
                                ],
                                "booking_conditions": [
                                    {
                                        "policy_type_key": "pbb_at_booking_time",
                                        "type": "prepayment",
                                        "text": "Prepayment",
                                        "icon": "credit_card",
                                        "key": "VP2PayInAdvanceKey",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    },
                                    {
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": "stop",
                                        "key": "NonRefundableKey",
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    }
                                ],
                                "policies": [
                                    {
                                        "icon": "checkmark",
                                        "policy_type_key": "flexible_to_reschedule",
                                        "type": "reschedule",
                                        "text": "Flexible to reschedule if plans change",
                                        "key": "NrOneFreeDateChangeKey"
                                    },
                                    {
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": null,
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "key": "NonRefundableKey"
                                    },
                                    {
                                        "icon": "credit_card_back",
                                        "policy_type_key": "pbb_at_booking_time",
                                        "type": "prepayment",
                                        "text": "Pay online",
                                        "key": "VP2PayInAdvanceKey",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    }
                                ]
                            },
                            "paymentterms_id": 1,
                            "is_flash_deal": 0,
                            "number_of_bathrooms": 0,
                            "nr_children": 0,
                            "half_board": 0,
                            "package_id": 0,
                            "full_board": 0,
                            "is_dormitory": 0,
                            "nr_adults": 2,
                            "depositterms_id": 1,
                            "bundle_extras": {
                                "icon": "",
                                "benefits": [
                                    {
                                        "category": "parking",
                                        "icon": "2444079",
                                        "title": "Parking",
                                        "name": "Parking",
                                        "details": [
                                            "Self parking for one vehicle per booked unit per stay."
                                        ],
                                        "catalog_item_id": 1
                                    },
                                    {
                                        "category": "flexible_checkin_out",
                                        "name": "Front desk services",
                                        "title": "Early check-in",
                                        "icon": "2444080",
                                        "catalog_item_id": 12,
                                        "details": [
                                            "Early check-in from 11:00."
                                        ]
                                    },
                                    {
                                        "category": "internet",
                                        "icon": "2444081",
                                        "name": "Internet",
                                        "title": "High-speed internet",
                                        "catalog_item_id": 18,
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
                                "has_rich_content": "",
                                "highlighted_text": "Includes 1 parking spot + early check-in + high-speed internet",
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
                                "generated_name": "Parking + early check-in + high-speed internet",
                                "bundle_id": 1209259
                            },
                            "room_count": 20,
                            "transactional_policy_objects": [
                                {
                                    "text": "Flexible to reschedule if plans change",
                                    "key": "NrOneFreeDateChangeKey",
                                    "icon": "checkmark"
                                },
                                {
                                    "icon": null,
                                    "key": "NonRefundableKey",
                                    "text": "Non-refundable"
                                },
                                {
                                    "icon": "credit_card_back",
                                    "text": "Pay online",
                                    "key": "VP2PayInAdvanceKey"
                                }
                            ],
                            "babycots_available_amount": null,
                            "all_inclusive": 0,
                            "room_surface_in_m2": 35,
                            "bh_room_highlights": [],
                            "refundable": 0,
                            "block_id": "2723042_95150930_2_2_0_1209259",
                            "fit_occupancy": {
                                "children_ages": [],
                                "nr_adults": 1
                            },
                            "refundable_until": "",
                            "room_name": "Superior Double Bed Sky Wing",
                            "max_children_free": 0,
                            "cfar_data": {
                                "is_applied": 0
                            },
                            "room_surface_in_feet2": 376.736864,
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
                                        "content": "Breakfast MYR 65",
                                        "mealplan_vector": "2",
                                        "class": "POLICY_HOTEL_MEALPLAN"
                                    },
                                    {
                                        "class": "POLICY_TITLE",
                                        "content": "Non Refundable"
                                    }
                                ]
                            },
                            "max_children_free_age": 0,
                            "smoking": 0,
                            "deposit_required": 1,
                            "name_without_policy": "Superior Double Bed Sky Wing",
                            "nr_stays": 10,
                            "is_block_fit": 1,
                            "must_reserve_free_parking": 0,
                            "is_vp2_enrolled": 1,
                            "extrabed_available": 0,
                            "extrabed_available_amount": null,
                            "is_last_minute_deal": 0,
                            "mealplan": "Breakfast MYR 65",
                            "can_reserve_free_parking": 1,
                            "name": "Superior Double Bed Sky Wing - Non-refundable",
                            "breakfast_included": 0,
                            "genius_discount_percentage": 0,
                            "b_bsb_campaigns": [],
                            "max_occupancy": 2,
                            "policy_display_details": {
                                "cancellation": {
                                    "parameters": {
                                        "has_cancellation_fee": 1
                                    },
                                    "is_cost_to_cancel": 0,
                                    "description_details": {
                                        "translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "placeholder_translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    },
                                    "title_details": {
                                        "placeholder_translation": "Non-refundable",
                                        "translation": "Non-refundable",
                                        "tag": "cxl_nr_name"
                                    },
                                    "type": "non_refundable",
                                    "policy_type_key": "non_refundable"
                                },
                                "prepayment": {
                                    "description_details": {
                                        "translation": "The total price of the reservation is charged at the time of booking.",
                                        "placeholder_translation": "The total price of the reservation is charged at the time of booking."
                                    },
                                    "policy_type_key": "pbb_at_booking_time",
                                    "type": "partial_prepayment",
                                    "title_details": {
                                        "tag": "payment_pay_online_name",
                                        "translation": "Pay online",
                                        "placeholder_translation": "Pay online"
                                    }
                                },
                                "reschedule": {
                                    "title_details": {
                                        "placeholder_translation": "Flexible to reschedule if plans change",
                                        "translation": "Flexible to reschedule if plans change",
                                        "tag": "tpex_rm_nr_flex_to_reschedule"
                                    }
                                },
                                "applied_products": [
                                    "pay_in_follows_policy"
                                ]
                            },
                            "product_price_breakdown": {
                                "all_inclusive_amount_hotel_currency": {
                                    "amount_unrounded": "THB 19,822",
                                    "value": 19822,
                                    "amount_rounded": "THB 19,822",
                                    "currency": "THB"
                                },
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
                                        "key": "use_js_tracking",
                                        "value": 1
                                    }
                                ],
                                "strikethrough_amount": {
                                    "amount_rounded": "MYR 5,432",
                                    "amount_unrounded": "MYR 5,431.57",
                                    "value": 5431.56955120815,
                                    "currency": "MYR"
                                },
                                "net_amount": {
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 2,091.39",
                                    "value": 2091.3864027466,
                                    "amount_rounded": "MYR 2,091"
                                },
                                "has_long_stays_weekly_rate_price": 0,
                                "strikethrough_amount_per_night": {
                                    "value": 678.946193901019,
                                    "amount_unrounded": "MYR 678.95",
                                    "amount_rounded": "MYR 679",
                                    "currency": "MYR"
                                },
                                "discounted_amount": {
                                    "currency": "MYR",
                                    "value": 2984.64746838888,
                                    "amount_unrounded": "MYR 2,984.65",
                                    "amount_rounded": "MYR 2,985"
                                },
                                "items": [
                                    {
                                        "details": "7 % VAT",
                                        "base": {
                                            "kind": "percentage",
                                            "percentage": 7
                                        },
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 146.397044735808,
                                            "amount_rounded": "MYR 146",
                                            "amount_unrounded": "MYR 146.40"
                                        },
                                        "kind": "charge",
                                        "inclusion_type": "included",
                                        "name": "VAT"
                                    },
                                    {
                                        "details": "10 % Service charge",
                                        "kind": "charge",
                                        "inclusion_type": "included",
                                        "name": "Service charge",
                                        "item_amount": {
                                            "value": 209.138635336869,
                                            "amount_rounded": "MYR 209",
                                            "amount_unrounded": "MYR 209.14",
                                            "currency": "MYR"
                                        },
                                        "base": {
                                            "percentage": 10,
                                            "kind": "percentage"
                                        }
                                    },
                                    {
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 2552.83768906783,
                                            "amount_rounded": "MYR 2,553",
                                            "amount_unrounded": "MYR 2,552.84"
                                        },
                                        "base": {
                                            "kind": "rate"
                                        },
                                        "name": "Bonus savings",
                                        "kind": "discount",
                                        "identifier": "basic-deal",
                                        "details": "You’re getting a reduced rate because this property is offering a discount."
                                    },
                                    {
                                        "kind": "discount",
                                        "identifier": "mobile-discount",
                                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                                        "base": {
                                            "kind": "rate"
                                        },
                                        "item_amount": {
                                            "amount_rounded": "MYR 432",
                                            "value": 431.809779321048,
                                            "amount_unrounded": "MYR 431.81",
                                            "currency": "MYR"
                                        },
                                        "name": "Mobile-only price"
                                    }
                                ],
                                "gross_amount": {
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 2,446.92",
                                    "value": 2446.92208281927,
                                    "amount_rounded": "MYR 2,447"
                                },
                                "all_inclusive_amount": {
                                    "amount_rounded": "MYR 2,447",
                                    "value": 2446.92208281927,
                                    "amount_unrounded": "MYR 2,446.92",
                                    "currency": "MYR"
                                },
                                "charges_details": {
                                    "mode": "all_included",
                                    "amount": {
                                        "value": 0,
                                        "currency": "MYR"
                                    },
                                    "translated_copy": "Includes taxes and fees"
                                },
                                "benefits": [
                                    {
                                        "badge_variant": "constructive",
                                        "icon": null,
                                        "kind": "badge",
                                        "name": "MYR 2,985 off",
                                        "identifier": "combined-discount",
                                        "details": "You’re getting MYR 2,985 off the original price due to multiple deals and benefits."
                                    },
                                    {
                                        "icon": null,
                                        "kind": "badge",
                                        "identifier": "mobile-rate",
                                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                                        "badge_variant": "constructive",
                                        "name": "Mobile-only price"
                                    }
                                ],
                                "included_taxes_and_charges_amount": {
                                    "value": 355.535680072677,
                                    "amount_rounded": "MYR 356",
                                    "amount_unrounded": "MYR 355.54",
                                    "currency": "MYR"
                                },
                                "gross_amount_hotel_currency": {
                                    "currency": "THB",
                                    "value": 19822,
                                    "amount_unrounded": "THB 19,822",
                                    "amount_rounded": "THB 19,822"
                                },
                                "has_long_stays_monthly_rate_price": 0,
                                "excluded_amount": {
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 0",
                                    "value": 0,
                                    "amount_unrounded": "MYR 0"
                                },
                                "gross_amount_per_night": {
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 306",
                                    "value": 305.865260352409,
                                    "amount_unrounded": "MYR 305.87"
                                },
                                "nr_stays": 10
                            }
                        },
                        "main_guest_name": "",
                        "repeatIndex": 2,
                        "uniqueKey": "2723042_95150930_2_2_0_1209259-2"
                    },
                    {
                        "block_id": "2723042_95150930_2_2_0_1209259",
                        "spec_room_data": {
                            "paymentterms": {
                                "prepayment": {
                                    "type": "full_prepayment",
                                    "info": {
                                        "refundable": 0,
                                        "is_midnight": null,
                                        "time_before_midnight": null,
                                        "prepayment_at_booktime": 0,
                                        "timezone": null,
                                        "date_before": null,
                                        "date": null,
                                        "time": null,
                                        "timezone_offset": null
                                    },
                                    "simple_translation": "Prepayment",
                                    "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                                    "type_extended": "non_refundable_prepayment",
                                    "description": "You'll be charged a prepayment of the total price at any time.",
                                    "type_translation": "SECURE YOUR BOOKING – pay now"
                                },
                                "cancellation": {
                                    "guaranteed_non_refundable": 0,
                                    "type_translation": "Non-refundable",
                                    "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged.",
                                    "non_refundable_anymore": 0,
                                    "type": "non_refundable",
                                    "bucket": "SMP_NON_REF",
                                    "info": {
                                        "refundable": 0,
                                        "is_midnight": null,
                                        "timezone": null,
                                        "date_before_raw": null,
                                        "date": null,
                                        "refundable_date": null,
                                        "timezone_offset": null,
                                        "time": null,
                                        "time_before_midnight": null,
                                        "date_before": null,
                                        "date_raw": null
                                    }
                                }
                            },
                            "pay_in_advance": 1,
                            "is_smart_deal": 0,
                            "room_id": 2723042,
                            "babycots_available": 0,
                            "fit_status": 2,
                            "nr_one_free_date_change": {
                                "policy_short": "Flexible to reschedule if plans change",
                                "date_change_until": "July 1, 2026",
                                "policy_long": "However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                            },
                            "roomtype_id": 9,
                            "children_ages": [],
                            "transactional_policy_data": {
                                "applied_products": [
                                    "pay_in_follows_policy"
                                ],
                                "booking_conditions": [
                                    {
                                        "policy_type_key": "pbb_at_booking_time",
                                        "type": "prepayment",
                                        "text": "Prepayment",
                                        "icon": "credit_card",
                                        "key": "VP2PayInAdvanceKey",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    },
                                    {
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": "stop",
                                        "key": "NonRefundableKey",
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    }
                                ],
                                "policies": [
                                    {
                                        "icon": "checkmark",
                                        "policy_type_key": "flexible_to_reschedule",
                                        "type": "reschedule",
                                        "text": "Flexible to reschedule if plans change",
                                        "key": "NrOneFreeDateChangeKey"
                                    },
                                    {
                                        "policy_type_key": "non_refundable",
                                        "type": "cancellation",
                                        "text": "Non-refundable",
                                        "icon": null,
                                        "description": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "key": "NonRefundableKey"
                                    },
                                    {
                                        "icon": "credit_card_back",
                                        "policy_type_key": "pbb_at_booking_time",
                                        "type": "prepayment",
                                        "text": "Pay online",
                                        "key": "VP2PayInAdvanceKey",
                                        "description": "The total price of the reservation is charged at the time of booking."
                                    }
                                ]
                            },
                            "paymentterms_id": 1,
                            "is_flash_deal": 0,
                            "number_of_bathrooms": 0,
                            "nr_children": 0,
                            "half_board": 0,
                            "package_id": 0,
                            "full_board": 0,
                            "is_dormitory": 0,
                            "nr_adults": 2,
                            "depositterms_id": 1,
                            "bundle_extras": {
                                "icon": "",
                                "benefits": [
                                    {
                                        "category": "parking",
                                        "icon": "2444079",
                                        "title": "Parking",
                                        "name": "Parking",
                                        "details": [
                                            "Self parking for one vehicle per booked unit per stay."
                                        ],
                                        "catalog_item_id": 1
                                    },
                                    {
                                        "category": "flexible_checkin_out",
                                        "name": "Front desk services",
                                        "title": "Early check-in",
                                        "icon": "2444080",
                                        "catalog_item_id": 12,
                                        "details": [
                                            "Early check-in from 11:00."
                                        ]
                                    },
                                    {
                                        "category": "internet",
                                        "icon": "2444081",
                                        "name": "Internet",
                                        "title": "High-speed internet",
                                        "catalog_item_id": 18,
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
                                "has_rich_content": "",
                                "highlighted_text": "Includes 1 parking spot + early check-in + high-speed internet",
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
                                "generated_name": "Parking + early check-in + high-speed internet",
                                "bundle_id": 1209259
                            },
                            "room_count": 20,
                            "transactional_policy_objects": [
                                {
                                    "text": "Flexible to reschedule if plans change",
                                    "key": "NrOneFreeDateChangeKey",
                                    "icon": "checkmark"
                                },
                                {
                                    "icon": null,
                                    "key": "NonRefundableKey",
                                    "text": "Non-refundable"
                                },
                                {
                                    "icon": "credit_card_back",
                                    "text": "Pay online",
                                    "key": "VP2PayInAdvanceKey"
                                }
                            ],
                            "babycots_available_amount": null,
                            "all_inclusive": 0,
                            "room_surface_in_m2": 35,
                            "bh_room_highlights": [],
                            "refundable": 0,
                            "block_id": "2723042_95150930_2_2_0_1209259",
                            "fit_occupancy": {
                                "children_ages": [],
                                "nr_adults": 1
                            },
                            "refundable_until": "",
                            "room_name": "Superior Double Bed Sky Wing",
                            "max_children_free": 0,
                            "cfar_data": {
                                "is_applied": 0
                            },
                            "room_surface_in_feet2": 376.736864,
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
                                        "content": "Breakfast MYR 65",
                                        "mealplan_vector": "2",
                                        "class": "POLICY_HOTEL_MEALPLAN"
                                    },
                                    {
                                        "class": "POLICY_TITLE",
                                        "content": "Non Refundable"
                                    }
                                ]
                            },
                            "max_children_free_age": 0,
                            "smoking": 0,
                            "deposit_required": 1,
                            "name_without_policy": "Superior Double Bed Sky Wing",
                            "nr_stays": 10,
                            "is_block_fit": 1,
                            "must_reserve_free_parking": 0,
                            "is_vp2_enrolled": 1,
                            "extrabed_available": 0,
                            "extrabed_available_amount": null,
                            "is_last_minute_deal": 0,
                            "mealplan": "Breakfast MYR 65",
                            "can_reserve_free_parking": 1,
                            "name": "Superior Double Bed Sky Wing - Non-refundable",
                            "breakfast_included": 0,
                            "genius_discount_percentage": 0,
                            "b_bsb_campaigns": [],
                            "max_occupancy": 2,
                            "policy_display_details": {
                                "cancellation": {
                                    "parameters": {
                                        "has_cancellation_fee": 1
                                    },
                                    "is_cost_to_cancel": 0,
                                    "description_details": {
                                        "translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates.",
                                        "placeholder_translation": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation. However, you can reschedule your stay one time until July 1, 2026 for the same or a higher price. You’ll only be charged if there’s a price difference between your new and old dates."
                                    },
                                    "title_details": {
                                        "placeholder_translation": "Non-refundable",
                                        "translation": "Non-refundable",
                                        "tag": "cxl_nr_name"
                                    },
                                    "type": "non_refundable",
                                    "policy_type_key": "non_refundable"
                                },
                                "prepayment": {
                                    "description_details": {
                                        "translation": "The total price of the reservation is charged at the time of booking.",
                                        "placeholder_translation": "The total price of the reservation is charged at the time of booking."
                                    },
                                    "policy_type_key": "pbb_at_booking_time",
                                    "type": "partial_prepayment",
                                    "title_details": {
                                        "tag": "payment_pay_online_name",
                                        "translation": "Pay online",
                                        "placeholder_translation": "Pay online"
                                    }
                                },
                                "reschedule": {
                                    "title_details": {
                                        "placeholder_translation": "Flexible to reschedule if plans change",
                                        "translation": "Flexible to reschedule if plans change",
                                        "tag": "tpex_rm_nr_flex_to_reschedule"
                                    }
                                },
                                "applied_products": [
                                    "pay_in_follows_policy"
                                ]
                            },
                            "product_price_breakdown": {
                                "all_inclusive_amount_hotel_currency": {
                                    "amount_unrounded": "THB 19,822",
                                    "value": 19822,
                                    "amount_rounded": "THB 19,822",
                                    "currency": "THB"
                                },
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
                                        "key": "use_js_tracking",
                                        "value": 1
                                    }
                                ],
                                "strikethrough_amount": {
                                    "amount_rounded": "MYR 5,432",
                                    "amount_unrounded": "MYR 5,431.57",
                                    "value": 5431.56955120815,
                                    "currency": "MYR"
                                },
                                "net_amount": {
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 2,091.39",
                                    "value": 2091.3864027466,
                                    "amount_rounded": "MYR 2,091"
                                },
                                "has_long_stays_weekly_rate_price": 0,
                                "strikethrough_amount_per_night": {
                                    "value": 678.946193901019,
                                    "amount_unrounded": "MYR 678.95",
                                    "amount_rounded": "MYR 679",
                                    "currency": "MYR"
                                },
                                "discounted_amount": {
                                    "currency": "MYR",
                                    "value": 2984.64746838888,
                                    "amount_unrounded": "MYR 2,984.65",
                                    "amount_rounded": "MYR 2,985"
                                },
                                "items": [
                                    {
                                        "details": "7 % VAT",
                                        "base": {
                                            "kind": "percentage",
                                            "percentage": 7
                                        },
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 146.397044735808,
                                            "amount_rounded": "MYR 146",
                                            "amount_unrounded": "MYR 146.40"
                                        },
                                        "kind": "charge",
                                        "inclusion_type": "included",
                                        "name": "VAT"
                                    },
                                    {
                                        "details": "10 % Service charge",
                                        "kind": "charge",
                                        "inclusion_type": "included",
                                        "name": "Service charge",
                                        "item_amount": {
                                            "value": 209.138635336869,
                                            "amount_rounded": "MYR 209",
                                            "amount_unrounded": "MYR 209.14",
                                            "currency": "MYR"
                                        },
                                        "base": {
                                            "percentage": 10,
                                            "kind": "percentage"
                                        }
                                    },
                                    {
                                        "item_amount": {
                                            "currency": "MYR",
                                            "value": 2552.83768906783,
                                            "amount_rounded": "MYR 2,553",
                                            "amount_unrounded": "MYR 2,552.84"
                                        },
                                        "base": {
                                            "kind": "rate"
                                        },
                                        "name": "Bonus savings",
                                        "kind": "discount",
                                        "identifier": "basic-deal",
                                        "details": "You’re getting a reduced rate because this property is offering a discount."
                                    },
                                    {
                                        "kind": "discount",
                                        "identifier": "mobile-discount",
                                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                                        "base": {
                                            "kind": "rate"
                                        },
                                        "item_amount": {
                                            "amount_rounded": "MYR 432",
                                            "value": 431.809779321048,
                                            "amount_unrounded": "MYR 431.81",
                                            "currency": "MYR"
                                        },
                                        "name": "Mobile-only price"
                                    }
                                ],
                                "gross_amount": {
                                    "currency": "MYR",
                                    "amount_unrounded": "MYR 2,446.92",
                                    "value": 2446.92208281927,
                                    "amount_rounded": "MYR 2,447"
                                },
                                "all_inclusive_amount": {
                                    "amount_rounded": "MYR 2,447",
                                    "value": 2446.92208281927,
                                    "amount_unrounded": "MYR 2,446.92",
                                    "currency": "MYR"
                                },
                                "charges_details": {
                                    "mode": "all_included",
                                    "amount": {
                                        "value": 0,
                                        "currency": "MYR"
                                    },
                                    "translated_copy": "Includes taxes and fees"
                                },
                                "benefits": [
                                    {
                                        "badge_variant": "constructive",
                                        "icon": null,
                                        "kind": "badge",
                                        "name": "MYR 2,985 off",
                                        "identifier": "combined-discount",
                                        "details": "You’re getting MYR 2,985 off the original price due to multiple deals and benefits."
                                    },
                                    {
                                        "icon": null,
                                        "kind": "badge",
                                        "identifier": "mobile-rate",
                                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                                        "badge_variant": "constructive",
                                        "name": "Mobile-only price"
                                    }
                                ],
                                "included_taxes_and_charges_amount": {
                                    "value": 355.535680072677,
                                    "amount_rounded": "MYR 356",
                                    "amount_unrounded": "MYR 355.54",
                                    "currency": "MYR"
                                },
                                "gross_amount_hotel_currency": {
                                    "currency": "THB",
                                    "value": 19822,
                                    "amount_unrounded": "THB 19,822",
                                    "amount_rounded": "THB 19,822"
                                },
                                "has_long_stays_monthly_rate_price": 0,
                                "excluded_amount": {
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 0",
                                    "value": 0,
                                    "amount_unrounded": "MYR 0"
                                },
                                "gross_amount_per_night": {
                                    "currency": "MYR",
                                    "amount_rounded": "MYR 306",
                                    "value": 305.865260352409,
                                    "amount_unrounded": "MYR 305.87"
                                },
                                "nr_stays": 10
                            }
                        },
                        "main_guest_name": "",
                        "repeatIndex": 3,
                        "uniqueKey": "2723042_95150930_2_2_0_1209259-3"
                    }
                ],
                "base_select_room_description": {
                    "total_same_rooms_name": "4 X Superior Double Bed Sky Wing"
                }
            }
        ],
        "rawjsondata": {
            "ufi": -3414440,
            "hotel_id": 27229,
            "hotel_name": "Ambassador Hotel Bangkok",
            "url": "https://www.booking.com/hotel/th/ambassador-bangkok.html",
            "hotel_name_trans": "",
            "review_nr": 3507,
            "arrival_date": "2026-07-04",
            "departure_date": "2026-07-12",
            "price_transparency_mode": "transparent",
            "accommodation_type_name": "Hotels",
            "latitude": 13.7421067346058,
            "longitude": 100.556720048189,
            "address": "171 Sukhumvit Road Soi 11",
            "address_trans": "",
            "city": "Bangkok",
            "city_trans": "Bangkok",
            "city_in_trans": "in Bangkok",
            "city_name_en": "Bangkok",
            "district": "Sukhumvit",
            "countrycode": "th",
            "distance_to_cc": 5.72467973691205,
            "default_language": "en-gb",
            "country_trans": "Thailand",
            "currency_code": "THB",
            "zip": "10110",
            "timezone": "Asia/Bangkok",
            "rare_find_state": "NOT_RARE",
            "soldout": 0,
            "available_rooms": 10,
            "max_rooms_in_reservation": 10,
            "average_room_size_for_ufi_m2": "40.99",
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
            "cc1": "th",
            "family_facilities": [
                "Outdoor pool",
                "Outdoor pool (year-round)"
            ],
            "product_price_breakdown": {
                "included_taxes_and_charges_amount": {
                    "value": 355.535680072677,
                    "amount_unrounded": "MYR 355.54",
                    "amount_rounded": "MYR 356",
                    "currency": "MYR"
                },
                "strikethrough_amount_per_night": {
                    "amount_unrounded": "MYR 678.95",
                    "amount_rounded": "MYR 679",
                    "value": 678.946193901019,
                    "currency": "MYR"
                },
                "gross_amount_per_night": {
                    "amount_rounded": "MYR 306",
                    "amount_unrounded": "MYR 305.87",
                    "value": 305.865260352409,
                    "currency": "MYR"
                },
                "excluded_amount": {
                    "amount_unrounded": "MYR 0",
                    "amount_rounded": "MYR 0",
                    "value": 0,
                    "currency": "MYR"
                },
                "has_long_stays_monthly_rate_price": 0,
                "net_amount": {
                    "currency": "MYR",
                    "value": 2091.3864027466,
                    "amount_unrounded": "MYR 2,091.39",
                    "amount_rounded": "MYR 2,091"
                },
                "has_long_stays_weekly_rate_price": 0,
                "nr_stays": 10,
                "strikethrough_amount": {
                    "currency": "MYR",
                    "amount_rounded": "MYR 5,432",
                    "amount_unrounded": "MYR 5,431.57",
                    "value": 5431.56955120815
                },
                "all_inclusive_amount_hotel_currency": {
                    "amount_rounded": "THB 19,822",
                    "amount_unrounded": "THB 19,822",
                    "value": 19822,
                    "currency": "THB"
                },
                "all_inclusive_amount": {
                    "value": 2446.92208281927,
                    "amount_rounded": "MYR 2,447",
                    "amount_unrounded": "MYR 2,446.92",
                    "currency": "MYR"
                },
                "gross_amount": {
                    "currency": "MYR",
                    "amount_rounded": "MYR 2,447",
                    "amount_unrounded": "MYR 2,446.92",
                    "value": 2446.92208281927
                },
                "discounted_amount": {
                    "currency": "MYR",
                    "value": 2984.64746838888,
                    "amount_unrounded": "MYR 2,984.65",
                    "amount_rounded": "MYR 2,985"
                },
                "benefits": [
                    {
                        "details": "You’re getting MYR 2,985 off the original price due to multiple deals and benefits.",
                        "name": "MYR 2,985 off",
                        "kind": "badge",
                        "icon": null,
                        "badge_variant": "constructive",
                        "identifier": "combined-discount"
                    },
                    {
                        "badge_variant": "constructive",
                        "icon": null,
                        "kind": "badge",
                        "name": "Mobile-only price",
                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                        "identifier": "mobile-rate"
                    }
                ],
                "gross_amount_hotel_currency": {
                    "currency": "THB",
                    "amount_rounded": "THB 19,822",
                    "amount_unrounded": "THB 19,822",
                    "value": 19822
                },
                "charges_details": {
                    "amount": {
                        "value": 0,
                        "currency": "MYR"
                    },
                    "translated_copy": "Includes taxes and fees",
                    "mode": "all_included"
                },
                "items": [
                    {
                        "details": "7 % VAT",
                        "inclusion_type": "included",
                        "name": "VAT",
                        "kind": "charge",
                        "base": {
                            "kind": "percentage",
                            "percentage": 7
                        },
                        "item_amount": {
                            "currency": "MYR",
                            "amount_rounded": "MYR 146",
                            "amount_unrounded": "MYR 146.40",
                            "value": 146.397044735808
                        }
                    },
                    {
                        "details": "10 % Service charge",
                        "name": "Service charge",
                        "inclusion_type": "included",
                        "kind": "charge",
                        "item_amount": {
                            "value": 209.138635336869,
                            "amount_rounded": "MYR 209",
                            "amount_unrounded": "MYR 209.14",
                            "currency": "MYR"
                        },
                        "base": {
                            "kind": "percentage",
                            "percentage": 10
                        }
                    },
                    {
                        "identifier": "basic-deal",
                        "name": "Bonus savings",
                        "details": "You’re getting a reduced rate because this property is offering a discount.",
                        "base": {
                            "kind": "rate"
                        },
                        "item_amount": {
                            "currency": "MYR",
                            "value": 2552.83768906783,
                            "amount_unrounded": "MYR 2,552.84",
                            "amount_rounded": "MYR 2,553"
                        },
                        "kind": "discount"
                    },
                    {
                        "kind": "discount",
                        "base": {
                            "kind": "rate"
                        },
                        "item_amount": {
                            "currency": "MYR",
                            "amount_rounded": "MYR 432",
                            "amount_unrounded": "MYR 431.81",
                            "value": 431.809779321048
                        },
                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                        "identifier": "mobile-discount",
                        "name": "Mobile-only price"
                    }
                ],
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
                        "key": "use_js_tracking",
                        "value": 1
                    }
                ]
            },
            "composite_price_breakdown": {
                "gross_amount": {
                    "amount_unrounded": "MYR 2,446.92",
                    "amount_rounded": "MYR 2,447",
                    "value": 2446.92208281927,
                    "currency": "MYR"
                },
                "all_inclusive_amount": {
                    "amount_unrounded": "MYR 2,446.92",
                    "amount_rounded": "MYR 2,447",
                    "value": 2446.92208281927,
                    "currency": "MYR"
                },
                "discounted_amount": {
                    "amount_rounded": "MYR 2,985",
                    "amount_unrounded": "MYR 2,984.65",
                    "value": 2984.64746838888,
                    "currency": "MYR"
                },
                "benefits": [
                    {
                        "identifier": "combined-discount",
                        "details": "You’re getting MYR 2,985 off the original price due to multiple deals and benefits.",
                        "name": "MYR 2,985 off",
                        "icon": null,
                        "kind": "badge",
                        "badge_variant": "constructive"
                    },
                    {
                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop.",
                        "name": "Mobile-only price",
                        "kind": "badge",
                        "icon": null,
                        "badge_variant": "constructive",
                        "identifier": "mobile-rate"
                    }
                ],
                "gross_amount_hotel_currency": {
                    "value": 19822,
                    "amount_rounded": "THB 19,822",
                    "amount_unrounded": "THB 19,822",
                    "currency": "THB"
                },
                "charges_details": {
                    "mode": "all_included",
                    "translated_copy": "Includes taxes and fees",
                    "amount": {
                        "value": 0,
                        "currency": "MYR"
                    }
                },
                "items": [
                    {
                        "kind": "charge",
                        "item_amount": {
                            "currency": "MYR",
                            "value": 146.397044735808,
                            "amount_rounded": "MYR 146",
                            "amount_unrounded": "MYR 146.40"
                        },
                        "base": {
                            "kind": "percentage",
                            "percentage": 7
                        },
                        "details": "7 % VAT",
                        "name": "VAT",
                        "inclusion_type": "included"
                    },
                    {
                        "name": "Service charge",
                        "inclusion_type": "included",
                        "details": "10 % Service charge",
                        "item_amount": {
                            "value": 209.138635336869,
                            "amount_unrounded": "MYR 209.14",
                            "amount_rounded": "MYR 209",
                            "currency": "MYR"
                        },
                        "base": {
                            "percentage": 10,
                            "kind": "percentage"
                        },
                        "kind": "charge"
                    },
                    {
                        "details": "You’re getting a reduced rate because this property is offering a discount.",
                        "identifier": "basic-deal",
                        "name": "Bonus savings",
                        "kind": "discount",
                        "base": {
                            "kind": "rate"
                        },
                        "item_amount": {
                            "currency": "MYR",
                            "amount_rounded": "MYR 2,553",
                            "amount_unrounded": "MYR 2,552.84",
                            "value": 2552.83768906783
                        }
                    },
                    {
                        "item_amount": {
                            "currency": "MYR",
                            "value": 431.809779321048,
                            "amount_rounded": "MYR 432",
                            "amount_unrounded": "MYR 431.81"
                        },
                        "base": {
                            "kind": "rate"
                        },
                        "kind": "discount",
                        "name": "Mobile-only price",
                        "identifier": "mobile-discount",
                        "details": "You’re getting a reduced rate compared to the rate available on a computer or laptop."
                    }
                ],
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
                        "key": "use_js_tracking",
                        "value": 1
                    }
                ],
                "included_taxes_and_charges_amount": {
                    "amount_rounded": "MYR 356",
                    "amount_unrounded": "MYR 355.54",
                    "value": 355.535680072677,
                    "currency": "MYR"
                },
                "strikethrough_amount_per_night": {
                    "amount_unrounded": "MYR 678.95",
                    "amount_rounded": "MYR 679",
                    "value": 678.946193901019,
                    "currency": "MYR"
                },
                "gross_amount_per_night": {
                    "value": 305.865260352409,
                    "amount_unrounded": "MYR 305.87",
                    "amount_rounded": "MYR 306",
                    "currency": "MYR"
                },
                "excluded_amount": {
                    "currency": "MYR",
                    "value": 0,
                    "amount_unrounded": "MYR 0",
                    "amount_rounded": "MYR 0"
                },
                "has_long_stays_monthly_rate_price": 0,
                "net_amount": {
                    "value": 2091.3864027466,
                    "amount_rounded": "MYR 2,091",
                    "amount_unrounded": "MYR 2,091.39",
                    "currency": "MYR"
                },
                "has_long_stays_weekly_rate_price": 0,
                "strikethrough_amount": {
                    "currency": "MYR",
                    "amount_rounded": "MYR 5,432",
                    "amount_unrounded": "MYR 5,431.57",
                    "value": 5431.56955120815
                },
                "all_inclusive_amount_hotel_currency": {
                    "value": 19822,
                    "amount_unrounded": "THB 19,822",
                    "amount_rounded": "THB 19,822",
                    "currency": "THB"
                }
            },
            "property_highlight_strip": [
                {
                    "icon_list": [
                        {
                            "icon": "iconset/parking_sign",
                            "size": 1
                        }
                    ],
                    "name": "Free parking"
                },
                {
                    "icon_list": [
                        {
                            "icon": "iconset/pool",
                            "size": 1
                        }
                    ],
                    "name": "Outdoor pool"
                },
                {
                    "name": "Restaurant",
                    "icon_list": [
                        {
                            "size": 1,
                            "icon": "iconset/food"
                        }
                    ]
                },
                {
                    "icon_list": [
                        {
                            "size": 1,
                            "icon": "iconset/snowflake"
                        }
                    ],
                    "name": "Air conditioning"
                },
                {
                    "name": "Private bathroom",
                    "icon_list": [
                        {
                            "size": 1,
                            "icon": "iconset/shower"
                        }
                    ]
                },
                {
                    "name": "View",
                    "icon_list": [
                        {
                            "icon": "iconset/eye",
                            "size": 1
                        }
                    ]
                },
                {
                    "icon_list": [
                        {
                            "size": 1,
                            "icon": "iconset/wifi"
                        }
                    ],
                    "name": "Free Wifi"
                },
                {
                    "icon_list": [
                        {
                            "size": 1,
                            "icon": "iconset/shower"
                        }
                    ],
                    "name": "Shower"
                },
                {
                    "name": "Fitness center",
                    "icon_list": [
                        {
                            "size": 1,
                            "icon": "iconset/fitness"
                        }
                    ]
                },
                {
                    "name": "Flat-screen TV",
                    "icon_list": [
                        {
                            "icon": "iconset/screen",
                            "size": 1
                        }
                    ]
                }
            ],
            "facilities_block": {
                "name": "Most Popular Facilities",
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
                        "icon": "fitness",
                        "name": "Fitness center"
                    },
                    {
                        "name": "Room service",
                        "icon": "clean"
                    },
                    {
                        "name": "Facilities for disabled guests",
                        "icon": "disabled"
                    },
                    {
                        "icon": "parking_sign",
                        "name": "Private Parking"
                    },
                    {
                        "icon": "wifi",
                        "name": "Wifi in all areas"
                    },
                    {
                        "icon": "food_and_drink",
                        "name": "Restaurant"
                    },
                    {
                        "name": "Free parking",
                        "icon": "parking_sign"
                    },
                    {
                        "icon": "wifi",
                        "name": "Free Wifi"
                    }
                ],
                "type": "popular"
            },
            "top_ufi_benefits": [
                {
                    "translated_name": "Swimming pool",
                    "icon": "pool"
                },
                {
                    "icon": "wifi",
                    "translated_name": "Wifi"
                },
                {
                    "translated_name": "Outdoor pool",
                    "icon": "pool"
                },
                {
                    "icon": "nosmoking",
                    "translated_name": "Non-smoking rooms"
                },
                {
                    "translated_name": "Fitness center",
                    "icon": "fitness"
                },
                {
                    "translated_name": "Parking",
                    "icon": "parking_sign"
                }
            ],
            "languages_spoken": {
                "languagecode": [
                    "th",
                    "en-gb"
                ]
            },
            "spoken_languages": [
                "th",
                "en-gb"
            ],
            "breakfast_review_score": {
                "review_snippet": "",
                "review_count": 0,
                "review_score": 0,
                "review_number": 0,
                "review_score_word": "",
                "rating": 0
            },
            "wifi_review_score": {
                "rating": 8.2
            },
            "min_room_distribution": {
                "children": [],
                "adults": 1
            },
            "tax_exceptions": [],
            "booking_home": {},
            "aggregated_data": {
                "has_nonrefundable": 1,
                "has_kitchen": 0,
                "common_kitchen_fac": [
                    {
                        "id": 22,
                        "name": "Refrigerator"
                    },
                    {
                        "name": "Electric kettle",
                        "id": 86
                    }
                ],
                "has_refundable": 0,
                "has_seating": 1
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
                    "number_of_extra_beds_and_babycots_total": 0,
                    "extra_beds_for_children_price_in_hotel_currency": 0,
                    "babies": 0,
                    "extra_babycots_price_in_hotel_currency": 0,
                    "number_of_extra_babycots": 0,
                    "total_extra_bed_price": 0,
                    "extra_beds_for_adults_price": 0,
                    "extra_babycots_price": 0,
                    "block_id": "2722902_95150930_2_2_0_1209259",
                    "number_of_extra_beds_for_children": 0,
                    "extra_beds_for_children_price": 0,
                    "total_extra_bed_price_in_hotel_currency": 0,
                    "extra_beds_for_adults_price_in_hotel_currency": 0,
                    "children": 0,
                    "number_of_extra_beds_for_adults": 0,
                    "adults": 1
                }
            ],
            "hotel_text": {},
            "districts": [
                1059,
                1887,
                2310,
                8868,
                12209
            ],
            "preferences": [],
            "hotel_important_information_with_codes": [
                {
                    "phrase": "Due to the coronavirus (COVID-19), this property is taking steps to protect the safety of guests and staff. Certain services and amenities may be reduced or unavailable as a result.",
                    "sentence_id": 54,
                    "executing_phase": 0
                },
                {
                    "executing_phase": 0,
                    "sentence_id": 8,
                    "phrase": "A damage deposit of THB 1000 is required on arrival. That's about MYR 123. This will be collected by credit card. You should be reimbursed within 14 days of check-out. Your deposit will be refunded in full by credit card, subject to an inspection of the property."
                }
            ],
            "rooms": {
                "2722902": {
                    "highlights": [
                        {
                            "icon": "wifi",
                            "translated_name": "Free WiFi"
                        },
                        {
                            "translated_name": "Cable channels",
                            "id": 68,
                            "icon": "checkmark"
                        },
                        {
                            "translated_name": "Free toiletries",
                            "id": 27,
                            "icon": "checkmark"
                        },
                        {
                            "translated_name": "City view",
                            "id": 121,
                            "icon": "city"
                        },
                        {
                            "translated_name": "Air conditioning",
                            "id": 11,
                            "icon": "snowflake"
                        },
                        {
                            "icon": "bath",
                            "translated_name": "Attached bathroom",
                            "id": 38
                        },
                        {
                            "icon": "screen",
                            "id": 75,
                            "translated_name": "Flat-screen TV"
                        }
                    ],
                    "cribs_extra_beds": {
                        "extra_beds": {
                            "ages": [
                                0,
                                1,
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
                            ],
                            "max_count": 1,
                            "all_free": 0
                        }
                    },
                    "description": "Located on floors 5 to 17 of the Tower Wing, this room features city views and an private bathroom.",
                    "facilities": [
                        {
                            "alt_facilitytype_id": 1,
                            "alt_facilitytype_name": "General",
                            "name": "Safe",
                            "facilitytype_id": 4,
                            "id": 6
                        },
                        {
                            "alt_facilitytype_id": 6,
                            "name": "Flat-screen TV",
                            "alt_facilitytype_name": "Media & Technology",
                            "id": 75,
                            "facilitytype_id": 6
                        },
                        {
                            "facilitytype_id": 8,
                            "id": 83,
                            "name": "Wake-up service",
                            "alt_facilitytype_name": "Services",
                            "alt_facilitytype_id": 3
                        },
                        {
                            "alt_facilitytype_name": "Living Area",
                            "name": "Sofa",
                            "id": 77,
                            "facilitytype_id": 4,
                            "alt_facilitytype_id": 15
                        },
                        {
                            "alt_facilitytype_id": 5,
                            "facilitytype_id": 8,
                            "id": 124,
                            "name": "Towels",
                            "alt_facilitytype_name": "Bathroom"
                        },
                        {
                            "alt_facilitytype_id": 15,
                            "alt_facilitytype_name": "Living Area",
                            "name": "Sitting area",
                            "facilitytype_id": 4,
                            "id": 26
                        },
                        {
                            "alt_facilitytype_id": 5,
                            "name": "Free toiletries",
                            "alt_facilitytype_name": "Bathroom",
                            "facilitytype_id": 5,
                            "id": 27
                        },
                        {
                            "alt_facilitytype_id": 7,
                            "name": "Tea/Coffee maker",
                            "alt_facilitytype_name": "Food & Drink",
                            "facilitytype_id": 7,
                            "id": 1
                        },
                        {
                            "alt_facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom",
                            "name": "Hairdryer",
                            "facilitytype_id": 5,
                            "id": 12
                        },
                        {
                            "alt_facilitytype_id": 6,
                            "facilitytype_id": 6,
                            "id": 8,
                            "alt_facilitytype_name": "Media & Technology",
                            "name": "TV"
                        },
                        {
                            "alt_facilitytype_id": 12,
                            "facilitytype_id": 7,
                            "id": 22,
                            "alt_facilitytype_name": "Kitchen",
                            "name": "Refrigerator"
                        },
                        {
                            "id": 125,
                            "facilitytype_id": 8,
                            "name": "Linens",
                            "alt_facilitytype_name": "Bedroom",
                            "alt_facilitytype_id": 17
                        },
                        {
                            "name": "City view",
                            "alt_facilitytype_name": "View",
                            "facilitytype_id": 9,
                            "id": 121,
                            "alt_facilitytype_id": 14
                        },
                        {
                            "alt_facilitytype_id": 5,
                            "name": "Toilet",
                            "alt_facilitytype_name": "Bathroom",
                            "id": 31,
                            "facilitytype_id": 5
                        },
                        {
                            "alt_facilitytype_id": 1,
                            "alt_facilitytype_name": "General",
                            "name": "Private entrance",
                            "id": 76,
                            "facilitytype_id": 4
                        },
                        {
                            "alt_facilitytype_id": 12,
                            "facilitytype_id": 7,
                            "id": 86,
                            "name": "Electric kettle",
                            "alt_facilitytype_name": "Kitchen"
                        },
                        {
                            "alt_facilitytype_id": 6,
                            "facilitytype_id": 6,
                            "id": 9,
                            "alt_facilitytype_name": "Media & Technology",
                            "name": "Telephone"
                        },
                        {
                            "alt_facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom",
                            "name": "Shower",
                            "id": 4,
                            "facilitytype_id": 5
                        },
                        {
                            "alt_facilitytype_id": 5,
                            "alt_facilitytype_name": "Bathroom",
                            "name": "Bidet",
                            "id": 100,
                            "facilitytype_id": 5
                        },
                        {
                            "id": 68,
                            "facilitytype_id": 6,
                            "name": "Cable channels",
                            "alt_facilitytype_name": "Media & Technology",
                            "alt_facilitytype_id": 6
                        },
                        {
                            "alt_facilitytype_id": 17,
                            "alt_facilitytype_name": "Bedroom",
                            "name": "Wardrobe or closet",
                            "id": 95,
                            "facilitytype_id": 4
                        },
                        {
                            "name": "Toilet paper",
                            "alt_facilitytype_name": "Bathroom",
                            "facilitytype_id": 5,
                            "id": 141,
                            "alt_facilitytype_id": 5
                        },
                        {
                            "id": 11,
                            "facilitytype_id": 4,
                            "alt_facilitytype_name": "General",
                            "name": "Air conditioning",
                            "alt_facilitytype_id": 1
                        },
                        {
                            "alt_facilitytype_id": 40,
                            "id": 231,
                            "facilitytype_id": 40,
                            "alt_facilitytype_name": "Cleanliness & disinfection",
                            "name": "Hand sanitizer"
                        },
                        {
                            "facilitytype_id": 5,
                            "id": 38,
                            "alt_facilitytype_name": "Bathroom",
                            "name": "Private bathroom",
                            "alt_facilitytype_id": 5
                        }
                    ],
                    "bed_configurations": [
                        {
                            "bed_types": [
                                {
                                    "description_imperial": "35–51 inches wide",
                                    "bed_type": 1,
                                    "description_localized": null,
                                    "description": "90–130 cm wide",
                                    "name_with_count": "2 twin beds",
                                    "name": "Twin bed(s)",
                                    "count": 2
                                }
                            ]
                        }
                    ],
                    "photos": [
                        {
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/402386973.jpg?k=752d33796d0d3dc3c27508e7ac50508223a1e36aa9c0425160044b39f3abf15e&o=",
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/402386973.jpg?k=752d33796d0d3dc3c27508e7ac50508223a1e36aa9c0425160044b39f3abf15e&o=",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/402386973.jpg?k=752d33796d0d3dc3c27508e7ac50508223a1e36aa9c0425160044b39f3abf15e&o=",
                            "ratio": 1.5003663003663,
                            "photo_id": 402386973,
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/402386973.jpg?k=752d33796d0d3dc3c27508e7ac50508223a1e36aa9c0425160044b39f3abf15e&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/402386973.jpg?k=752d33796d0d3dc3c27508e7ac50508223a1e36aa9c0425160044b39f3abf15e&o=",
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/402386973.jpg?k=752d33796d0d3dc3c27508e7ac50508223a1e36aa9c0425160044b39f3abf15e&o=",
                            "last_update_date": "2022-10-19 05:46:13",
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/402386973.jpg?k=752d33796d0d3dc3c27508e7ac50508223a1e36aa9c0425160044b39f3abf15e&o="
                        },
                        {
                            "last_update_date": "2022-10-19 05:46:13",
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/402386974.jpg?k=31c8f0cc0cc0868af7d9d08173a76e1b38c542b8df99e0f5e87ee0c4642ff925&o=",
                            "ratio": 1.5003663003663,
                            "photo_id": 402386974,
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/402386974.jpg?k=31c8f0cc0cc0868af7d9d08173a76e1b38c542b8df99e0f5e87ee0c4642ff925&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/402386974.jpg?k=31c8f0cc0cc0868af7d9d08173a76e1b38c542b8df99e0f5e87ee0c4642ff925&o=",
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/402386974.jpg?k=31c8f0cc0cc0868af7d9d08173a76e1b38c542b8df99e0f5e87ee0c4642ff925&o=",
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/402386974.jpg?k=31c8f0cc0cc0868af7d9d08173a76e1b38c542b8df99e0f5e87ee0c4642ff925&o=",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/402386974.jpg?k=31c8f0cc0cc0868af7d9d08173a76e1b38c542b8df99e0f5e87ee0c4642ff925&o=",
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/402386974.jpg?k=31c8f0cc0cc0868af7d9d08173a76e1b38c542b8df99e0f5e87ee0c4642ff925&o="
                        },
                        {
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/592542699.jpg?k=1af0dac7bcdf1f298e6800561a9857b3e0ad9afbe3961b86c40e6a9876876437&o=",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/592542699.jpg?k=1af0dac7bcdf1f298e6800561a9857b3e0ad9afbe3961b86c40e6a9876876437&o=",
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/592542699.jpg?k=1af0dac7bcdf1f298e6800561a9857b3e0ad9afbe3961b86c40e6a9876876437&o=",
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/592542699.jpg?k=1af0dac7bcdf1f298e6800561a9857b3e0ad9afbe3961b86c40e6a9876876437&o=",
                            "photo_id": 592542699,
                            "ratio": 1.49926793557833,
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/592542699.jpg?k=1af0dac7bcdf1f298e6800561a9857b3e0ad9afbe3961b86c40e6a9876876437&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/592542699.jpg?k=1af0dac7bcdf1f298e6800561a9857b3e0ad9afbe3961b86c40e6a9876876437&o=",
                            "last_update_date": "2024-08-28 06:49:47",
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/592542699.jpg?k=1af0dac7bcdf1f298e6800561a9857b3e0ad9afbe3961b86c40e6a9876876437&o="
                        },
                        {
                            "url_640x200": "https://cf.bstatic.com/xdata/images/hotel/640x200/592543828.jpg?k=8ada6ef2c69f725f9c2e0f670ea9e0fdabb048914abd0239a6b751bd2da3decb&o=",
                            "url_square60": "https://cf.bstatic.com/xdata/images/hotel/square60/592543828.jpg?k=8ada6ef2c69f725f9c2e0f670ea9e0fdabb048914abd0239a6b751bd2da3decb&o=",
                            "url_max750": "https://cf.bstatic.com/xdata/images/hotel/max750/592543828.jpg?k=8ada6ef2c69f725f9c2e0f670ea9e0fdabb048914abd0239a6b751bd2da3decb&o=",
                            "photo_id": 592543828,
                            "ratio": 1.49835181300569,
                            "url_square180": "https://cf.bstatic.com/xdata/images/hotel/square180/592543828.jpg?k=8ada6ef2c69f725f9c2e0f670ea9e0fdabb048914abd0239a6b751bd2da3decb&o=",
                            "last_update_date": "2024-08-28 06:57:37",
                            "url_original": "https://cf.bstatic.com/xdata/images/hotel/max500/592543828.jpg?k=8ada6ef2c69f725f9c2e0f670ea9e0fdabb048914abd0239a6b751bd2da3decb&o=",
                            "url_max1280": "https://cf.bstatic.com/xdata/images/hotel/1280x900/592543828.jpg?k=8ada6ef2c69f725f9c2e0f670ea9e0fdabb048914abd0239a6b751bd2da3decb&o=",
                            "url_max300": "https://cf.bstatic.com/xdata/images/hotel/max300/592543828.jpg?k=8ada6ef2c69f725f9c2e0f670ea9e0fdabb048914abd0239a6b751bd2da3decb&o="
                        }
                    ],
                    "private_bathroom_highlight": {
                        "has_highlight": 1
                    },
                    "children_and_beds_text": {
                        "cribs_and_extra_beds": [
                            {
                                "highlight": 0,
                                "text": "The price in THB has been converted to show you the approximate price in MYR."
                            },
                            {
                                "highlight": 0,
                                "text": "Additional fees are not calculated automatically in the total cost and will have to be paid for separately during your stay."
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
                                "highlight": 0,
                                "text": "Children of all ages are welcome."
                            },
                            {
                                "highlight": 0,
                                "text": "Children 18 and above will be charged as adults at this property."
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
                                    "price_mode": "per_night",
                                    "id": 56924744,
                                    "price_mode_n": 0,
                                    "price_type_n": 0,
                                    "price": 0,
                                    "price_type": "free",
                                    "guaranteed": 0
                                },
                                "extra_bed": {
                                    "price_type": "fixed",
                                    "price_mode_n": 0,
                                    "id": 56924743,
                                    "price": "MYR 148.13",
                                    "price_mode": "per_night",
                                    "price_type_n": 2
                                },
                                "max_age": 2,
                                "min_age": 0,
                                "group_by_price": {
                                    "fixed,per_night,148.13": [
                                        "extra_bed"
                                    ],
                                    "free,per_night,0": [
                                        "crib"
                                    ]
                                },
                                "types_by_price": [
                                    [
                                        "crib"
                                    ],
                                    [
                                        "extra_bed"
                                    ]
                                ]
                            },
                            {
                                "min_age": 3,
                                "types_by_price": [
                                    [
                                        "extra_bed"
                                    ]
                                ],
                                "group_by_price": {
                                    "fixed,per_night,148.13": [
                                        "extra_bed"
                                    ]
                                },
                                "extra_bed": {
                                    "id": 56924743,
                                    "price_mode_n": 0,
                                    "price_type": "fixed",
                                    "price_type_n": 2,
                                    "price_mode": "per_night",
                                    "price": "MYR 148.13"
                                },
                                "max_age": 255
                            }
                        ]
                    },
                    "private_bathroom_count": 0
                }
            },
            "block": [
                {
                    "all_inclusive": 0,
                    "must_reserve_free_parking": 0,
                    "can_reserve_free_parking": 1,
                    "block_id": "2722902_95150930_2_2_0_1209259",
                    "name_without_policy": "Superior Twin Bed Sky Wing",
                    "refundable": 0,
                    "paymentterms": {
                        "prepayment": {
                            "type_extended": "non_refundable_prepayment",
                            "info": {
                                "time_before_midnight": null,
                                "refundable": 0,
                                "timezone_offset": null,
                                "is_midnight": null,
                                "date": null,
                                "date_before": null,
                                "prepayment_at_booktime": 0,
                                "time": null,
                                "timezone": null
                            },
                            "extended_type_translation": "SECURE YOUR BOOKING – pay now",
                            "description": "You'll be charged a prepayment of the total price at any time.",
                            "type": "full_prepayment",
                            "type_translation": "SECURE YOUR BOOKING – pay now",
                            "simple_translation": "Prepayment"
                        },
                        "cancellation": {
                            "non_refundable_anymore": 0,
                            "info": {
                                "date_before_raw": null,
                                "date_before": null,
                                "time": null,
                                "refundable": 0,
                                "timezone_offset": null,
                                "is_midnight": null,
                                "date": null,
                                "timezone": null,
                                "time_before_midnight": null,
                                "date_raw": null,
                                "refundable_date": null
                            },
                            "description": "Note that if canceled, modified, or in case of no-show, the total price of the reservation will be charged.",
                            "type": "non_refundable",
                            "bucket": "SMP_NON_REF",
                            "guaranteed_non_refundable": 0,
                            "type_translation": "Non-refundable"
                        }
                    },
                    "name": "Superior Twin Bed Sky Wing - Non-refundable",
                    "refundable_until": "",
                    "number_of_bathrooms": 0,
                    "max_children_free": 0,
                    "room_surface_in_m2": 35,
                    "half_board": 0,
                    "is_last_minute_deal": 0,
                    "fit_occupancy": {
                        "children_ages": [],
                        "nr_adults": 1
                    },
                    "roomtype_id": 8,
                    "nr_adults": 2,
                    "is_domestic_rate": 0,
                    "genius_discount_percentage": 0,
                    "bundle_extras": {
                        "experiments": [
                            {
                                "stages": [
                                    "1",
                                    "3"
                                ],
                                "tag": "ios_value_adds_copy_experiment_3"
                            }
                        ],
                        "has_rich_content": "",
                        "benefits": [
                            {
                                "category": "parking",
                                "name": "Parking",
                                "details": [
                                    "Self parking for one vehicle per booked unit per stay."
                                ],
                                "title": "Parking",
                                "catalog_item_id": 1,
                                "icon": "2444079"
                            },
                            {
                                "icon": "2444080",
                                "catalog_item_id": 12,
                                "title": "Early check-in",
                                "details": [
                                    "Early check-in from 11:00."
                                ],
                                "name": "Front desk services",
                                "category": "flexible_checkin_out"
                            },
                            {
                                "details": [
                                    "High-speed internet throughout your stay."
                                ],
                                "name": "Internet",
                                "category": "internet",
                                "icon": "2444081",
                                "catalog_item_id": 18,
                                "title": "High-speed internet"
                            }
                        ],
                        "generated_name": "Parking + early check-in + high-speed internet",
                        "highlighted_text": "Includes 1 parking spot + early check-in + high-speed internet",
                        "rich_footer": [
                            "Contact the property to arrange this service.",
                            "All additional services are the responsibility of the property.",
                            "Any unused products and services included in the rate are non-refundable."
                        ],
                        "icon": "",
                        "bundle_id": 1209259,
                        "rich_value_add_page_title": ""
                    },
                    "babycots_available": 0,
                    "nr_children": 0,
                    "block_text": {
                        "policies": [
                            {
                                "content": "If you cancel, modify the booking, or don't show up, the fee will be the total price of the reservation.",
                                "class": "POLICY_CANCELLATION"
                            },
                            {
                                "content": "The total price of the reservation is charged at the time of booking.",
                                "class": "POLICY_PREPAY"
                            },
                            {
                                "class": "POLICY_HOTEL_MEALPLAN",
                                "mealplan_vector": "2",
                                "content": "Breakfast MYR 65"
                            },
                            {
                                "content": "Non Refundable",
                                "class": "POLICY_TITLE"
                            },
                            {
                                "class": "POLICY_REFUND_SCHEDULE",
                                "content": " You won't be eligible for a refund if you cancel this booking."
                            }
                        ]
                    },
                    "smoking": 0,
                    "children_ages": [],
                    "breakfast_included": 0,
                    "is_vp2_enrolled": 1,
                    "room_name": "Superior Twin Bed Sky Wing",
                    "is_smart_deal": 0,
                    "bh_room_highlights": [],
                    "room_surface_in_feet2": 376.736864,
                    "mealplan": "Breakfast MYR 65",
                    "deposit_required": 1,
                    "pod_ios_migrate_policies_to_smp_fullon": 0,
                    "pay_in_advance": 1,
                    "is_block_fit": "",
                    "fit_status": 0,
                    "package_id": 0,
                    "number_of_bedrooms": 0,
                    "extrabed_available": 0,
                    "max_occupancy": "2",
                    "babycots_available_amount": null,
                    "full_board": 0,
                    "is_flash_deal": 0,
                    "room_id": 2722902,
                    "max_children_free_age": 0,
                    "extrabed_available_amount": null,
                    "room_count": 20
                }
            ],
            "rawData": {
                "isPreferred": true,
                "rankingPosition": 0,
                "optOutFromGalleryChanges": 1,
                "accuratePropertyClass": 4,
                "countryCode": "th",
                "priceBreakdown": {
                    "grossPrice": {
                        "value": 1864.8780243289,
                        "currency": "THB",
                        "amountRounded": "THB 1,865"
                    },
                    "taxExceptions": [],
                    "chargesInfo": "Includes taxes and charges",
                    "benefitBadges": []
                },
                "name": "Ambassador Hotel Bangkok",
                "id": 27229,
                "ufi": -3414440,
                "propertyClass": 4,
                "currency": "THB",
                "mainPhotoId": 402387347,
                "isFirstPage": true,
                "reviewScore": 7.7,
                "checkout": {
                    "fromTime": "00:00",
                    "untilTime": "12:00"
                },
                "position": 0,
                "isTPI": true,
                "checkinDate": "2026-06-27",
                "checkoutDate": "2026-06-28",
                "blockIds": [
                    "2723043_0_2_0_0"
                ],
                "longitude": 100.556720048189,
                "photoUrls": [
                    "https://cf.bstatic.com/xdata/images/hotel/square60/402387347.jpg?k=8490d062ca18a5039cd3c64e3d7a5dbbff89a7c9e2c4b54721fa7ce0aa3a873a&o="
                ],
                "reviewCount": 3507,
                "isHighlightedHotel": true,
                "qualityClass": 0,
                "checkin": {
                    "untilTime": "00:00",
                    "fromTime": "14:00"
                },
                "reviewScoreWord": "Good",
                "latitude": 13.7421067346058,
                "wishlistName": "Bangkok"
            }
        }
    }
}