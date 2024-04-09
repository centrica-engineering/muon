@detail
Feature: muon detail component

    Scenario Outline: muon detail <type> component

        Given Launch the '<component>' component '<type>' type in the browser
        When User clicks to expand the detail
        Then Validate the attributes and elements in the '<type>' detail component

        Examples:
        |component       |type          |
        |muon-detail     |standard      |
        |muon-detail     |with-icon     |