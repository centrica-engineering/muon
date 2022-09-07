@card
Feature: muon card component

    Scenario Outline: muon card <type> component

        Given Launch the '<component>' component '<type>' type in the browser
        When the user changes the content in the '<type>' card
        Then Validate the shadow dom and elements in '<type>' type

        Examples:
        |component       |type                  |
        |muon-card       |standard              |
        |muon-card       |standard-with-image   |

    Scenario Outline: muon card with cta component

        Given Launch the '<component>' component '<type>' type in the browser
        When the user changes the content in the '<type>' card
        Then Validate the shadow dom and elements in '<type>' type

        Examples:
        |component       |type                  |
        |muon-card       |standard-with-cta     |
