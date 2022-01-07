Feature: muon inputter component
    
    Scenario Outline: muon inputter standard component

        Given Launch the '<component>' component '<type>' type in the browser
        When User enter the input
        Then Validate the elements and validation message

         Examples:
        |component       |type          |
        |muon-inputter   |standard      |

    Scenario Outline: muon inputter radio component

        Given Launch the '<component>' component '<type>' type in the browser
        When User selects the '<type>' and validate the value attriute
        Then Validate the elements and attriutes in the inputter

         Examples:
        |component       |type          |
        |muon-inputter   |radio         |

    Scenario Outline: muon inputter checkbox component

        Given Launch the '<component>' component '<type>' type in the browser
        When User selects the '<type>' and validate the value attriute
        # Then Validate the elements and attriutes in the inputter

         Examples:
        |component       |type          |
        |muon-inputter   |checkbox      |