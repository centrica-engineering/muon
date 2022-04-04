@cake
Feature: Order the cake in ember app 

    Scenario Outline: Order <shape> <flavour> <colour> cake with own configuration

        Given Launch the ember cake website
        When the user views the welcome page and clicks on make your cake
        And select the shape of the cake as '<shape>'
        And enter the tiers count
        And select the flavour sponge as '<flavour>'
        And select the icing colour as '<colour>'
        And select the filling from the list
        And select the occasion as '<occasion>'
        And select the decoration from the list
        And enter the personal and delivery details
        Then validate '<shape>' '<colour>' '<occasion>' details in the comfirmation page

        Examples:
        |shape     |flavour  |colour  |occasion   |
        |Round     |Vanilla  |Black   |Birthday   |
        |Square    |Chocolate|Purple  |Wedding    |
        |Triangle  |Ginger   |Pink    |Funeral    |
        |Round     |Vanilla  |Blue    |Anniversary|
        |Square    |Chocolate|Green   |Other      |
        |Triangle  |Ginger   |Brown   |undefined  |

    Scenario Outline: Validate the navigation to previous page

        Given Launch the ember cake website
        When the user views the welcome page and clicks on make your cake
        And select the shape of the cake as '<shape>'
        Then click CTA and navigate to previous page

        Examples:
        |shape     |
        |Round     |
       