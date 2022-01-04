Feature: muon inputter component
    
    Scenario Outline: muon inputter standard component

        Given Launch the '<component>' component '<type>' type in the browser
        When User enter the input
        Then Validate the elements and validation message

         Examples:
        |component       |type          |
        |muon-inputter   |standard      |