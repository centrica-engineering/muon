Feature: muon inputter component
    
    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        When User enter the input
        Then Validate the elements and validation message

         Examples:
        |component       |type          |
        |muon-inputter   |text          |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes in '<component>' '<type>' type
        And Validate the helper and tip details
        And Enter the email in the inputter and validate the message

         Examples:
        |component       |type          |
        |muon-inputter   |email         |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes in '<component>' '<type>' type
        And Validate the helper and tip details
        And Enter the telephone number in the inputter and validate the message

         Examples:
        |component       |type          |
        |muon-inputter   |tel           |

    # Scenario Outline: muon inputter checkbox component

    #     Given Launch the '<component>' component '<type>' type in the browser
    #     When User clicks the '<type>' and validate the value attriute
    #     Then Validate the elements and attriutes in the '<type>' inputter

    #      Examples:
    #     |component       |type          |
    #     |muon-inputter   |checkbox      |

    # Scenario Outline: muon inputter checkbox component

    #     Given Launch the '<component>' component '<type>' type in the browser
    #     When User clicks the '<type>' and validate the value attriute
    #     Then Validate the elements and attriutes in the '<type>' inputter

    #      Examples:
    #     |component       |type          |
    #     |muon-inputter   |select        |