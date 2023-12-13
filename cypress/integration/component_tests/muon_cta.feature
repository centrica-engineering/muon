@cta
Feature: muon CTA component

    Scenario Outline: muon CTA <type> component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements and attributes in the '<type>' component

        Examples:
        |component       |type                  |
        |muon-cta        |standard              |
        |muon-cta        |disabled              |
        |muon-cta        |loading               |
        |muon-cta        |hidden                |       
        |muon-cta        |standard-link         |
        |muon-cta        |disabled-link         |
        |muon-cta        |loading-link          |
        |muon-cta        |standard-button       |
        |muon-cta        |disabled-button       |
        |muon-cta        |loading-button        |
        |muon-cta        |standard-within-link  |
        |muon-cta        |disabled-within-link  |
        |muon-cta        |loading-within-link   |
        |muon-cta        |standard-within-button|
        |muon-cta        |disabled-within-button|
        |muon-cta        |loading-within-button |
        |muon-cta        |standard-form         |
        |muon-cta        |disabled-form         |
        |muon-cta        |loading-form          |