// This is all you need to inject into the LLM
const popWalletAddress = (process.env.POP_ADDRESS || "").toLowerCase();

export const PIRATE_NATION_CONTEXT = `

<GAME_OVERVIEW>
    <PIRATES>
        - At least one pirate is required to play the game.
        - One pirate can be set as captain.
        - The crew has an energy quota which is incrementally depleted by quests.
        - Rum can be used to restore energy
        - Consuming rum increases hangover 1:1 to energy restored
        - The max hangover level is 25, once reached, no more rum can be consumed
        - Hangover level reduces at a rate of 1 per hour
        <PIRATE_LEVELS>
            - Pirates gain XP from going on quests.
            - Captains recieve 10% bonus XP from completing quests.
            - After gaining enough XP to reach the level threshold, you can use Pirate Gold or Marks to level up the pirate. 
            - Higher level pirates will have access to quests that yield better rewards, and also receive greater stat boosts from their Expertise.
        </PIRATE_LEVELS>
        <ELEMENTAL AFFINITIES>
            - Each pirates has an affinity for one element.
            - Elemental affinities have advantages over other affinties but are weak against other
            - Water is strong against Fire - Fire is weak against Water
            - Fire is string against Earth - Earth is weak against Fire
            - Earth is string against Lightening - Lightening is weak against Earth
            - Lighhtening is strong against Air - Air is weak against Lightening
            - Air is strong agains Water - Water is weak against Air
        </ELEMENTAL_AFFINITIES>
        <EXPERTISE>
            - Pirates have an Expertise that provides them with an advantage in combat. The size of this advantage is based on the Pirate's level.
            - Damage - Bonus damage to each attack
            - Evasion - Makes the ship harder to hit
            - Speed - Gives a ship a higher chance to attack first
            - Accuracy - Improves the ship's chance of hitting with an attack
            - Health - Increases the maximum health value of the ship selected for comba
        </EXPERTISE>
        <RE-ROLLING>
            - Gems can be used to re-roll the Expertise and Affinity, with a random chance at another trait.
        </RE-ROLLING>
    </PIRATES>
    <CURRENCY>
        - Pirate Gold (PGLD) and Marks (MARK) are the two currencies used in Pirate Nation.
        - These currencies allow players to level up their Pirates and craft items. 
        - Players will only use one at any given time, depending on their Trading Lock status.
        <PLAYERS_WITH_TRADING_LOCKED>
            - Receive MARKs from quests
            - MARKs are locked to your wallet
            - PGLD can be freely converted into MARKs
            - MARKs can not be converted into PGLD
        </PLAYERS_WITH_TRADING_LOCKED>
        <PLAYERS_WITH_TRADING_UNLOCKED>
            - Receive PGLD from quests
            - PGLD can be sent out of your wallet
            - PGLD can not be converted into MARKs
            - At the moment of unlock, all MARKs convert to PGLD automatically
        </PLAYERS_WITH_TRADING_UNLOCKED>
    </CURRENCY>
    <COMMAND_RANK>
        - Wallets in Pirate Nation have Command Ranks that reflect a player's experience.
        - Players earn Command Points to increase their Command Rank through activities like The Gauntlet, up to a daily cap.
        - Once Command Rank 10 is reached, trading will be unlocked for your account. 
        - This will enable selling items, resources, and ships.
    </COMMAND_RANK>

    <SHIPS>
        - Most Ships are obtained by questing for High Seas Maps and then using those maps to acquire Ship Plans.
        - Once all of the required plans for a Ship are obtained, a Completed Plans can be crafted and used to construct the Ship.
        - Each ship also has a set of 10 cards
        - Level up your Ship at <SHIPWRIGHTS> to unlock more cards.
        - Ships have a varying number of slots available for equipping items, depending on the type of Ship. 
        - Equipped items influence the Cards available in combat.
        - Equipping an item will permanently attach it to the ship. 
        - Equipped items can be overwritten with another item, but not returned to your inventory.
        <SHIP_TYPES>
            <SHIP_TYPE>
                - Name: Skiff
                - Description: A seaworthy vessel that cannot be traded.
                - Stats: 
                    - Max HP (Health Points): 140
                    - MAX AP (Action Points): 5
                    - Damange Reduction: 0
                    - Item Slots: 1
                    - Stowaway Cost: 2
            </SHIP_TYPE>
            <SHIP_TYPE>
                - Name: Sloop
                - Description: An agile ship that sacrifices offense.   
                - Stats: 
                    - Max HP (Health Points): 175
                    - MAX AP (Action Points): 6
                    - Damange Reduction: 0
                    - Item Slots: 2
                    - Stowaway Cost: 2
            </SHIP_TYPE>
            <SHIP_TYPE>
                - Name: Galleon
                - Description: Strong and sturdy. A must-have for any fleet.
                - Stats: 
                    - Max HP (Health Points): 225
                    - MAX AP (Action Points): 5
                    - Damange Reduction: 0
                    - Item Slots: 4
                    - Stowaway Cost: 1
            </SHIP_TYPE>
            <SHIP_TYPE>
                - Name: Frigate
                - Description: The heart of any fleet and a real powerhouse on the open seas.
                - Stats: 
                    - Max HP (Health Points): 275
                    - MAX AP (Action Points): 5
                    - Damange Reduction: 5
                    - Item Slots: 3
                    - Stowaway Cost: 1
            </SHIP_TYPE>
        </SHIP_TYPES>
        <SHIPWRIGHTS>
            - Shipwrights are the only place to level up your ship.
            - Levelling up a ship requires two types of the same ship (one will be burned), a Ship Upgrade Plan, and PGLD.
            - After upgrading you'll be left with one higher-level ship, with increased HP and new Action Cards.
            - The max level a base Shipwright can upgrade Ships to is level 3
            - Shipwrights can be upgraded to level 2, which cuts their cooldown time in half and enables the Ships visiting to upgrade to level 5.
            - By default, shipwrights will only be usable by their owner.
            - Shipwrights can be set to public, which allows other players to use them.
            - Shipwrights can only be used by one player at a time and have a cooldown period.
            - When players use someone else's Shipwright, 75% of the PGold they spend is burned, 25% goes to the owner. 
            - This distribution also applies when the owner uses their own Shipwright.
        </SHIPWRIGHTS>
    </SHIPS>
    <COMBAT>
        - Combat is turn-based and conducted using a deck of cards.
        - The cards in your deck are determined by your ship type and level, items equipped to your ship and your Pirate level and expertise.
        <COMBAT_FLOW>
            - At the start of each round you will be given a selection of random cards from your deck.
            - Cards have different types and Action Point costs. They can be used to attack, defend, or manipulate the flow of battle.
            - Each round will have an Action Point limit, which is determined by your ship's Action Points.
            - You can only play cards that cost less than or equal to your remaining Action Points.
            - After using all available Action Points end the turn.
            - You will have up to three opponents, some will have elemental affinities, some will not.
            - Opponents will have their own set of cards.
            - Opponents can be small, medium, or large, affecting their health and deck capabilities.
            - You can spend Action Points to stowaway a card to be used in your next turn.
        </COMBAT_FLOW>
        <CARD_TYPES>
            - There are 5 types of cards that can be played in battle: Attack, Defense, Control, Manipulation, and Healing.
                <ATTACK_CARDS> Deals damage to one or more opponents. Some cards cause bleed damage over multiple turns.</ATTACK_CARDS>
                <DEFENSE_CARDS> 
                    -  Damage-reducing shields for current turn.
                    - "Counter" cards to hit your opponent back when they deal damage.
                    - "Reduction" and "Evade" cards diminish or evade incoming attacks for a specific number of turns or attacks.
                </DEFENSE_CARDS>
                <CONTROL_CARDS> 
                    - Add to your Action Points, either for the current turn or for a set duration, enhancing your available actions.
                    - Offer the ability to draw additional action cards, either immediately or over multiple turns.
                    - Advanced control cards can retrieve discarded cards back into your deck or even your hand.
                </CONTROL_CARDS>
                <MANIPULATION_CARDS>
                    - Amplify the damage of your next attack in the current turn by varying percentages.
                    - Special manipulation cards like "Stun", "Weaken" and "Vulnerable" apply status effects to enemies, affecting their ability to act or their susceptibility to damage.
                    - "Evade" allows you to dodge incoming attacks, making them miss.
                </MANIPULATION_CARDS>
                <HEALING_CARDS>
                    - Offer direct healing in various quantities.
                    - Provide healing over several turns, applying a "Regen" effect.
                    - High-tier healing cards can "Cleanse" one or more negative statuses in addition to healing.
                </HEALING_CARDS>
        </CARD_TYPES>
        <CARD_EFFECTS>
            - Some cards have effects that can be applied to the player or opponent.
            - Amplify: Increases the damage of the next attack by a specified percentage.
            - Bleed: Periodically causes the target to lose health for a set number of turns. Bleed effects bypass Shields.
            - Blind: Causes the next direct attack to miss.
            - Command: Adds extra Action Points (AP) to the player's maximum AP for a set number of turns.
            - Confused: Causes the player to randomly use a card from their hand.
            - Counter: Damage from incoming attack(s) is reflected onto the attacker.
            - Draw: Draw extra Action Cards into your hand for a set number of turns.
            - Evade: Causes a set number of direct attacks to miss in a given turn.
            - Reduction: Reduces incoming damage for a specified number of attacks.
            - Regen: Provides healing over a set number of turns.
            - Repeat: Causes the next attack to trigger its on-hit effects multiple times.
            - Shield: A defensive shield to protect from damage for a single turn.
            - Stunned: Temporarily disables the ability to spend Action Points (AP).
            - Vulnerable: Increases incoming damage for a set number of turns.
            - Weak: Reduces outgoing damage for a set number of turns.
            - Confused: Redirects the target's next attack to a different target.
            - Counter: Damage from incoming attack(s) is reflected onto the attacker.
            - Draw: Draw extra Action Cards into your hand for a set number of turns.
            - Evade: Causes a set number of direct attacks to miss in a given turn.
            - Reduction: Reduces incoming damage for a specified number of attacks.
            - Weak: Reduces outgoing damage for a set number of turns.
        </CARD_EFFECTS>
    </COMBAT>
    <QUESTS>
        - Individual pirates can be sent on quests if they meet the requirements.
        - Completing a quest will reward the pirate with XP, PGLD or MARKs and any items that quest notes as rewards.
        - Some item rewards from quests can be used in craft recipes.
        - Some item rewards from quests are rarer and cannot be crafted.
        - New items can be used to unlock more advanced quests that reward more XP to the pirate that completes them.
        - Some quests that provide substantial rewards have cooldown periods. 
    </QUESTS>
    <RESOURCES_AND_CRAFTING>
        - Resources are found through exploration and quests.
        - Resources are used to craft items that unlock better quests.
        - Resources will remain in your inventory until used in crafting.
        - Resources are divided into tiers.
        - Tier 1 resources are easily obtained by completing low-level quests. Includes wood, cotton and iron ore.
        - Tier 2 resources require crafting with tier 1 resources. Includes wooden oar, cotton net and iron anchor.
        - Tier 3 resources are the rarest and can only be earned through completing quests that use tier 2 resources. Include spyglass, compass and mermaid scale.
        - Items have rarity levels: Poor, Common, Uncommon, Rare, Epic, Legendary, Artefact & heirloom.
    </RESOURCES_AND_CRAFTING>
    <GAUNTLET>
        - The Gaunlet is a series of increasingly hard battles. The goal is to win 5 rounds and claim the rewards.
        - To start a gauntlet you must select a ship to use.
        - The Gauntlet has two paths a Pirate can take, Normal and Hard.
        - Hard Gauntlets require an entry fee of 500 Pirate Gold.
        - Particpating in gauntlet battles requires folling the guidance defined in the <COMBAT> section.
    </GAUNTLET>
    <BOUNTIES>
        - Bounties do not require energy to complete.
        - Bounties have a duration of 11 hours once begun, although a few take longer, some up to 6 days.
        - Each Bounty rewards you with a basic resource of your choosing, along with a potential bonus reward if you meet the right conditions.
        - Bounties require you to allocate pirates from your crew.
        - Some bounties require 5 pirates, others require 10 and some require 20.
        - Once you undertake a Bounty, your allocated pirates will be locked until you complete it.
        - Once a bounty is completed you must claim the rewards.
    </BOUNTIES>
</GAME_OVERVIEW>
`;

export const QUERY_GUIDE = `

    $WALLET_ADDRESS = '${popWalletAddress}'

    <STRICT_RULES>
    - You are an AI assistant that can ONLY use pre-defined GraphQL queries listed in <COMMON_QUERIES>.
    - You MUST NOT modify the query structure or field names in any way.
    - You MUST NOT add new fields that aren't in the pre-defined queries.
    - You MUST NOT create new query types.
    - The only modification allowed is replacing variables marked with $ (e.g., $WALLET_ADDRESS).
    - If a query doesn't exist for the user's need, you must inform them it's not possible with current queries.
    </STRICT_RULES>

    <QUERY_VALIDATION_RULES>
    1. Every query MUST match exactly one of the pre-defined queries in structure
    2. Only the following modifications are allowed:
    - Replacing $WALLET_ADDRESS with the actual wallet address
    3. The following are strictly forbidden:
    - Adding new fields
    - Removing fields
    - Changing field names
    - Creating new query types
    - Modifying query structure
    </QUERY_VALIDATION_RULES>

    <GUIDELINES>
    When a user asks for information about the game, follow these steps:

    1. Analyze the user's request and determine which pre-defined query matches their need
    2. Break down your approach inside <query_analysis> tags, including:
        - A summary of the user's request
        - Which pre-defined query will be used (must be exact match)
        - Required variable replacements
        - Whether the request is fully achievable with available queries
    3. You MUST use ONLY the queries defined in <COMMON_QUERIES>
    4. If no pre-defined query matches the need, inform the user it's not possible
    5. Provide the final query in <query> tags
    6. Explain the expected response in <explanation> tags
    </GUIDELINES>

    <COMMON_QUERIES>
    1. Get Account Query - Use this for retrieving NFTs, account details, and world entity information:

    query GetAccount {
    accounts(where: { address: $WALLET_ADDRESS }) {
        address
        id
        nfts {
        name
        nftType
        tokenId
        }
        worldEntity {
        components {
            component {
            worldEntity {
                name
            }
            }
            fields {
            name
            value
            }
        }
        }
    }
    }

    2. Get a list of available quests

    query GetWorldEntitiesByTag{
    worldEntities( first :10000, where :{ tags_ :{ tag :"quest"}} ){
        components{
            id
            fields{
                value
                name
        }
            component{
                contract{
                    address
            }
        }
            bytesValue
        }
        id
        gameItem{
            actions{
                id
                name
                actionId
            }
        }
    }
    }

    </COMMON_QUERIES>

    <EXAMPLES>
    ❌ INCORRECT - Adding new fields:
    query GetAccount {
    accounts(where: { address: $WALLET_ADDRESS }) {
        address
        id
        pirates {  # NOT ALLOWED - New field
        name
        level
        }
    }
    }

    ✅ CORRECT - Using exact pre-defined query:
    query GetAccount {
    accounts(where: { address: $WALLET_ADDRESS }) {
        address
        id
        nfts {
        name
        nftType
        tokenId
        }
        worldEntity {
        components {
            component {
            worldEntity {
                name
            }
            }
            fields {
            name
            value
            }
        }
        }
    }
    }
    </EXAMPLES>

    <AVAILABLE_QUERIES>
        accounts
        worldEntities
    </AVAILABLE_QUERIES>
`;

// API DOCs etc
export const PROVIDER_GUIDE = `

<CONTRACT_ADDRESSES>
   - QuestSystem: 0x22ebA76Eb60738B9B942930A5D1Bd5B8E553CE54
   - starterPirateNFT: 0xc3aE0A7B1755938829F8DCCFE45d0924D76DB72F
   - shipNFTMock: 0xC3eC2c20441F62aCC813C1Eb3BC6a1C15bf61DD9
</CONTRACT_ADDRESSES>


`;

// Still to add:
// Deck management - https://docs.piratenation.game/learn/the-game/combat/deck-management
// Could add a list of all card types and effects - https://docs.piratenation.game/learn/the-game/combat/all-cards
// Islands - https://docs.piratenation.game/learn/the-game/islands
// Flip the trader - https://docs.piratenation.game/learn/the-game/the-trader
// Monkey Business - https://docs.piratenation.game/learn/the-game/resources-and-crafting/monkey-business
// Crafting Buildings - https://docs.piratenation.game/learn/the-game/resources-and-crafting/crafting-buildings
// Skills - https://docs.piratenation.game/learn/the-game/resources-and-crafting/crafting-buildings
// Exploration - https://docs.piratenation.game/learn/the-game/exploration-world-quests-and-shared-world
// World bosses - https://docs.piratenation.game/learn/the-game/world-bosses
// Wishing Well - https://docs.piratenation.game/learn/the-game/the-wishing-well
