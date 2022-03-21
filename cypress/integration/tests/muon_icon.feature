@icon
Feature: muon icon component

    Scenario Outline: muon icon standard component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the svg element

        Examples:
        |component       |type          |
        |muon-icon       |standard      |