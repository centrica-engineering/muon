@cake
Feature: Order the cake in ember app 

    Scenario Outline: Order <shape> <flavour> <colour> cake with own configuration

        Given Launch the ember cake website
        When the user views the welcome page and clicks on make your cake
        And select the shape of the cake as '<shape>'
        And enter the tiers count 
        And select the flavour sponge as '<flavour>'
        And select the icing colour as '<colour>'
        And select the filling as '<filling>'
        # And select the occasion as '<occasion>'
        # And select the decoration as '<decoration>'
        # And enter the personal and delivery details
        # Then validate all the details in the comfirmation page

        Examples:
        |shape     |flavour  |colour  |
        |Round     |Vanilla  |Black   |
        |Square    |Chocolate|Purple  |
        |Triangle  |Ginger   |Pink    |
        |Round     |Vanilla  |Blue    |
        |Square    |Chocolate|Green   |
        |Triangle  |Ginger   |Brown   |