@cta
Feature: muon CTA component

    Scenario Outline: muon CTA <type> component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements and attributes in the '<type>' component

        Examples:
        |component       |type                  |
        |cta             |standard              |
        |cta             |disabled              |
        |cta             |loading               |
        |cta             |hidden                |       
        |cta             |standard-link         |
        |cta             |disabled-link         |
        |cta             |loading-link          |
        |cta             |standard-button       |
        |cta             |disabled-button       |
        |cta             |loading-button        |
        |cta             |standard-within-link  |
        |cta             |disabled-within-link  |
        |cta             |loading-within-link   |
        |cta             |standard-within-button|
        |cta             |disabled-within-button|
        |cta             |loading-within-button |
        |cta             |standard-form         |
        |cta             |disabled-form         |
        |cta             |loading-form          |