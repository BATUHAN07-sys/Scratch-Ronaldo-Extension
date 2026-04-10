(function(Scratch) {
  'use strict';

  class RonaldoMaker {
    constructor() {
      this._seed = 12345;
      this._timerStart = Date.now();
      this._lastTime = Date.now();
      this._deltaTime = 0;
      this._stamina = 100;
      this._goalsThisMatch = 0;
      this._matchEnded = false;
      this._careerGoals = 850;
      this._teamMorale = 95;
      this._totalSiuuus = 0;
      this._isInjured = false;
      this._matchesPlayed = 0;
      this._headersScored = 0;
      this._freeKicksScored = 0;
      this._sprintsUsed = 0;
      this._jerseyNumber = 7;
      this._goalStreak = 0;
      this._longestStreak = 0;
      this._currentStreakBonus = 0;
      this._xpLevel = 1;
      this._totalXP = 0;
      this._legendUnlocked = false;
      this._battleActive = false;
      this._battleWinner = '';
      this._tournamentActive = false;
      this._tournamentRound = 0;
      this._tournamentCards = [];
      this._tournamentWinner = '';
      this._prizeMoney = 0;
      this._groupStageActive = false;
      this._groups = [[],[],[],[]];
      this._tournamentPoints = {};
      this.messiRoastLines = [
        "Messi is good... at being second. Siuuu!",
        "Penalties are for Messi. Goals are for CR7.",
        "He needs a team. I carry mine.",
        "Ballon d'Or? I have 5. He has... less.",
        "Dribbling is cute. Winning is CR7.",
        "Argentina needed a whole country. I did it alone.",
        "Messi wishes he had my jump.",
        "Free kicks? I invented the knuckleball.",
        "He's short. I'm the complete package."
      ];
      this.aiResponses = {
        default: ["SIIUUU! Let's crush it today! 🐐", "Hard work beats talent.", "You can be the GOAT too!"],
        siuuu: ["SIIUUUUUU!!! 🐐⚽", "SIUUU! That's the spirit!"],
        goal: ["GOOOAAALLL!!! Siuuu!"],
        motivation: ["Never give up.", "Stay humble, stay hungry."]
      };
    }

    getInfo() {
      return {
        id: 'ronaldomaker',
        name: '⚽ CR7 RonaldoMaker v31 LONGEST .js FILE',
        color1: '#DA291C',
        color2: '#FFD700',
        blocks: [
          // HAT BLOCKS - super easy events
          { opcode: 'whenCR7Scores', blockType: Scratch.BlockType.HAT, text: 'when CR7 scores a goal' },
          { opcode: 'whenMatchEnds', blockType: Scratch.BlockType.HAT, text: 'when match ends' },
          { opcode: 'whenStaminaRunsOut', blockType: Scratch.BlockType.HAT, text: 'when CR7 stamina runs out' },
          { opcode: 'whenBicycleKickLands', blockType: Scratch.BlockType.HAT, text: 'when CR7 bicycle kick lands' },
          { opcode: 'whenPenaltyIsTaken', blockType: Scratch.BlockType.HAT, text: 'when CR7 takes a penalty' },
          { opcode: 'whenLegendStatusUnlocked', blockType: Scratch.BlockType.HAT, text: 'when CR7 legend status unlocked' },
          { opcode: 'whenTeamMoraleMax', blockType: Scratch.BlockType.HAT, text: 'when team morale reaches MAX' },
          { opcode: 'whenPlayerInjured', blockType: Scratch.BlockType.HAT, text: 'when CR7 gets injured' },
          { opcode: 'whenFreeKickScored', blockType: Scratch.BlockType.HAT, text: 'when CR7 scores free kick' },
          { opcode: 'whenHeaderScored', blockType: Scratch.BlockType.HAT, text: 'when CR7 scores header' },
          { opcode: 'whenSprintUsed', blockType: Scratch.BlockType.HAT, text: 'when CR7 uses sprint' },
          { opcode: 'whenGoalStreakReached', blockType: Scratch.BlockType.HAT, text: 'when CR7 goal streak reached' },
          { opcode: 'whenMatchWon', blockType: Scratch.BlockType.HAT, text: 'when CR7 match is won' },
          { opcode: 'whenMessiMentioned', blockType: Scratch.BlockType.HAT, text: 'when someone mentions Messi' },
          { opcode: 'whenCR7TouchesGround', blockType: Scratch.BlockType.HAT, text: 'when CR7 touches the ground' },
          { opcode: 'whenCR7TouchesWall', blockType: Scratch.BlockType.HAT, text: 'when CR7 touches the wall' },
          { opcode: 'whenCR7GetsPowerUp', blockType: Scratch.BlockType.HAT, text: 'when CR7 gets power-up' },
          { opcode: 'whenTimerReachesZero', blockType: Scratch.BlockType.HAT, text: 'when timer reaches zero' },
          { opcode: 'whenRonaldoCardDrawn', blockType: Scratch.BlockType.HAT, text: 'when Ronaldo card is drawn' },
          { opcode: 'whenRonaldoCardPlayed', blockType: Scratch.BlockType.HAT, text: 'when Ronaldo card is played' },
          { opcode: 'whenCardBattleStarts', blockType: Scratch.BlockType.HAT, text: 'when card battle starts' },
          { opcode: 'whenCardBattleWon', blockType: Scratch.BlockType.HAT, text: 'when card battle is won' },
          { opcode: 'whenCardBattleLost', blockType: Scratch.BlockType.HAT, text: 'when card battle is lost' },
          { opcode: 'whenTournamentRoundStarts', blockType: Scratch.BlockType.HAT, text: 'when tournament round starts' },
          { opcode: 'whenTournamentSemiFinal', blockType: Scratch.BlockType.HAT, text: 'when tournament semi-final' },
          { opcode: 'whenTournamentFinal', blockType: Scratch.BlockType.HAT, text: 'when tournament final' },
          { opcode: 'whenTournamentEnds', blockType: Scratch.BlockType.HAT, text: 'when tournament ends' },
          { opcode: 'whenGroupStageEnds', blockType: Scratch.BlockType.HAT, text: 'when group stage ends' },
          { opcode: 'whenKnockoutStarts', blockType: Scratch.BlockType.HAT, text: 'when knockout starts' },
          { opcode: 'whenStreakOf5Reached', blockType: Scratch.BlockType.HAT, text: 'when CR7 gets 5 goal streak' },
          { opcode: 'whenHotStreakStarts', blockType: Scratch.BlockType.HAT, text: 'when CR7 hot streak starts' },
          { opcode: 'whenStreakOf10Reached', blockType: Scratch.BlockType.HAT, text: 'when CR7 gets 10 goal streak' },
          '---',
          // COMMAND BLOCKS - super easy actions
          { opcode: 'resetStamina', blockType: Scratch.BlockType.COMMAND, text: 'reset CR7 stamina to full' },
          { opcode: 'triggerCelebration', blockType: Scratch.BlockType.COMMAND, text: 'trigger CR7 Siuuu celebration' },
          { opcode: 'trainSkill', blockType: Scratch.BlockType.COMMAND, text: 'train CR7 skill + [XP] XP', arguments: { XP: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100} }},
          { opcode: 'updateScore', blockType: Scratch.BlockType.COMMAND, text: 'update match score home [HOME] away [AWAY]', arguments: { HOME: {type: Scratch.ArgumentType.NUMBER, defaultValue: 3}, AWAY: {type: Scratch.ArgumentType.NUMBER, defaultValue: 2} }},
          { opcode: 'awardGoldenBoot', blockType: Scratch.BlockType.COMMAND, text: 'award CR7 Golden Boot' },
          { opcode: 'resetFullMatch', blockType: Scratch.BlockType.COMMAND, text: 'reset full match stats' },
          { opcode: 'triggerPenalty', blockType: Scratch.BlockType.COMMAND, text: 'trigger CR7 penalty shot' },
          { opcode: 'boostTeamMorale', blockType: Scratch.BlockType.COMMAND, text: 'boost team morale by [AMOUNT]', arguments: { AMOUNT: {type: Scratch.ArgumentType.NUMBER, defaultValue: 20} }},
          { opcode: 'healPlayer', blockType: Scratch.BlockType.COMMAND, text: 'heal CR7 from injury' },
          { opcode: 'playSiuuuSound', blockType: Scratch.BlockType.COMMAND, text: 'play CR7 Siuuu sound effect' },
          { opcode: 'increaseCareerGoals', blockType: Scratch.BlockType.COMMAND, text: 'increase CR7 career goals by [AMOUNT]', arguments: { AMOUNT: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1} }},
          { opcode: 'decreaseTeamMorale', blockType: Scratch.BlockType.COMMAND, text: 'decrease team morale by [AMOUNT]', arguments: { AMOUNT: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10} }},
          { opcode: 'setJerseyNumber', blockType: Scratch.BlockType.COMMAND, text: 'set CR7 jersey number to [NUMBER]', arguments: { NUMBER: {type: Scratch.ArgumentType.NUMBER, defaultValue: 7} }},
          { opcode: 'triggerMessiRoast', blockType: Scratch.BlockType.COMMAND, text: 'trigger CR7 Messi roast' },
          { opcode: 'cr7MoveForward', blockType: Scratch.BlockType.COMMAND, text: 'CR7 move forward [SPEED]', arguments: { SPEED: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10} }},
          { opcode: 'cr7Jump', blockType: Scratch.BlockType.COMMAND, text: 'CR7 jump height [HEIGHT]', arguments: { HEIGHT: {type: Scratch.ArgumentType.NUMBER, defaultValue: 20} }},
          { opcode: 'cr7TurnLeft', blockType: Scratch.BlockType.COMMAND, text: 'CR7 turn left [DEGREES]', arguments: { DEGREES: {type: Scratch.ArgumentType.NUMBER, defaultValue: 15} }},
          { opcode: 'cr7TurnRight', blockType: Scratch.BlockType.COMMAND, text: 'CR7 turn right [DEGREES]', arguments: { DEGREES: {type: Scratch.ArgumentType.NUMBER, defaultValue: 15} }},
          { opcode: 'cr7StopMoving', blockType: Scratch.BlockType.COMMAND, text: 'CR7 stop moving' },
          { opcode: 'cr7RandomLuckyNumber', blockType: Scratch.BlockType.COMMAND, text: 'CR7 set random lucky number between [MIN] [MAX]', arguments: { MIN: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1}, MAX: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100} }},
          { opcode: 'addToList', blockType: Scratch.BlockType.COMMAND, text: 'add [ITEM] to list [LIST]', arguments: { ITEM: {type: Scratch.ArgumentType.STRING, defaultValue: 'goal'}, LIST: {type: Scratch.ArgumentType.STRING, defaultValue: 'myList'} }},
          { opcode: 'removeFromList', blockType: Scratch.BlockType.COMMAND, text: 'remove item [ITEM] from list [LIST]', arguments: { ITEM: {type: Scratch.ArgumentType.STRING, defaultValue: 'goal'}, LIST: {type: Scratch.ArgumentType.STRING, defaultValue: 'myList'} }},
          { opcode: 'cr7SayHello', blockType: Scratch.BlockType.COMMAND, text: 'CR7 say hello' },
          { opcode: 'cr7ChangeColor', blockType: Scratch.BlockType.COMMAND, text: 'CR7 change color to [COLOR]', arguments: { COLOR: {type: Scratch.ArgumentType.STRING, defaultValue: 'red'} }},
          { opcode: 'cr7GrowBigger', blockType: Scratch.BlockType.COMMAND, text: 'CR7 grow bigger by [SIZE]', arguments: { SIZE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10} }},
          { opcode: 'cr7ShrinkSmaller', blockType: Scratch.BlockType.COMMAND, text: 'CR7 shrink smaller by [SIZE]', arguments: { SIZE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10} }},
          { opcode: 'cr7SetScore', blockType: Scratch.BlockType.COMMAND, text: 'CR7 set score to [SCORE]', arguments: { SCORE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 5} }},
          { opcode: 'cr7PlayGoalSound', blockType: Scratch.BlockType.COMMAND, text: 'CR7 play goal sound' },
          { opcode: 'createRonaldoCard', blockType: Scratch.BlockType.COMMAND, text: 'create Ronaldo card named [NAME] goal power [POWER] speed [SPEED] header [HEADER]', arguments: { NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'CR7 Legend'}, POWER: {type: Scratch.ArgumentType.NUMBER, defaultValue: 95}, SPEED: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90}, HEADER: {type: Scratch.ArgumentType.NUMBER, defaultValue: 85} }},
          { opcode: 'playRonaldoCard', blockType: Scratch.BlockType.COMMAND, text: 'play Ronaldo card [CARD]' },
          { opcode: 'startCardBattle', blockType: Scratch.BlockType.COMMAND, text: 'start card battle with opponent card [OPPONENT]' },
          { opcode: 'attackWithCard', blockType: Scratch.BlockType.COMMAND, text: 'attack with Ronaldo card [CARD]' },
          { opcode: 'defendWithCard', blockType: Scratch.BlockType.COMMAND, text: 'defend with Ronaldo card [CARD]' },
          { opcode: 'startTournament', blockType: Scratch.BlockType.COMMAND, text: 'start tournament with [NUMBER] players', arguments: { NUMBER: {type: Scratch.ArgumentType.NUMBER, defaultValue: 8} }},
          { opcode: 'addCardToBracket', blockType: Scratch.BlockType.COMMAND, text: 'add Ronaldo card [CARD] to bracket' },
          { opcode: 'simulateNextRound', blockType: Scratch.BlockType.COMMAND, text: 'simulate next tournament round' },
          { opcode: 'startGroupStage', blockType: Scratch.BlockType.COMMAND, text: 'start group stage' },
          { opcode: 'addCardToGroup', blockType: Scratch.BlockType.COMMAND, text: 'add Ronaldo card [CARD] to group [GROUP]', arguments: { CARD: {type: Scratch.ArgumentType.STRING, defaultValue: 'CR7 Legend'}, GROUP: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1} }},
          { opcode: 'simulateGroupStage', blockType: Scratch.BlockType.COMMAND, text: 'simulate group stage' },
          { opcode: 'givePrizeMoney', blockType: Scratch.BlockType.COMMAND, text: 'give prize money [AMOUNT]', arguments: { AMOUNT: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1000} }},
          { opcode: 'increaseStreak', blockType: Scratch.BlockType.COMMAND, text: 'increase CR7 streak by [AMOUNT]', arguments: { AMOUNT: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1} }},
          { opcode: 'resetStreak', blockType: Scratch.BlockType.COMMAND, text: 'reset CR7 streak' },
          { opcode: 'giveStreakBonus', blockType: Scratch.BlockType.COMMAND, text: 'give streak bonus [BONUS]', arguments: { BONUS: {type: Scratch.ArgumentType.NUMBER, defaultValue: 50} }},
          { opcode: 'cr7DoubleTheNumber', blockType: Scratch.BlockType.COMMAND, text: 'CR7 double the number [NUMBER]', arguments: { NUMBER: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10} }},
          { opcode: 'cr7HalveTheNumber', blockType: Scratch.BlockType.COMMAND, text: 'CR7 halve the number [NUMBER]', arguments: { NUMBER: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100} }},
          '---',
          // BOOLEAN BLOCKS - super easy yes/no
          { opcode: 'isStaminaLow', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 stamina low?' },
          { opcode: 'hasHatTrick', blockType: Scratch.BlockType.BOOLEAN, text: 'has CR7 scored hat-trick?' },
          { opcode: 'isLegendaryForm', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 in legendary form?' },
          { opcode: 'canDoBicycleKick', blockType: Scratch.BlockType.BOOLEAN, text: 'can CR7 do bicycle kick?' },
          { opcode: 'isFreeKickInRange', blockType: Scratch.BlockType.BOOLEAN, text: 'is free-kick in range?' },
          { opcode: 'isLegendUnlocked', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 legend status unlocked?' },
          { opcode: 'isPlayerInjured', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 injured?' },
          { opcode: 'isPenaltyPerfect', blockType: Scratch.BlockType.BOOLEAN, text: 'is penalty shot perfect?' },
          { opcode: 'hasEnoughStaminaForSprint', blockType: Scratch.BlockType.BOOLEAN, text: 'has enough stamina for sprint?' },
          { opcode: 'isBallInGoalArea', blockType: Scratch.BlockType.BOOLEAN, text: 'is ball in goal area?' },
          { opcode: 'hasGoalStreak', blockType: Scratch.BlockType.BOOLEAN, text: 'has CR7 goal streak of 3 or more?' },
          { opcode: 'isMatchWon', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 match won?' },
          { opcode: 'isMessiBetter', blockType: Scratch.BlockType.BOOLEAN, text: 'is Messi better than CR7?' },
          { opcode: 'isCR7TouchingGround', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 touching the ground?' },
          { opcode: 'isCR7TouchingWall', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 touching the wall?' },
          { opcode: 'isListEmpty', blockType: Scratch.BlockType.BOOLEAN, text: 'is list [LIST] empty?', arguments: { LIST: {type: Scratch.ArgumentType.STRING, defaultValue: 'myList'} }},
          { opcode: 'isCR7Moving', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 moving?' },
          { opcode: 'isScoreHigh', blockType: Scratch.BlockType.BOOLEAN, text: 'is score high?' },
          { opcode: 'isTimeUp', blockType: Scratch.BlockType.BOOLEAN, text: 'is time up?' },
          { opcode: 'isRonaldoCardLegendary', blockType: Scratch.BlockType.BOOLEAN, text: 'is Ronaldo card [CARD] legendary?' },
          { opcode: 'isCardBattleWon', blockType: Scratch.BlockType.BOOLEAN, text: 'is card battle won?' },
          { opcode: 'isTournamentFinished', blockType: Scratch.BlockType.BOOLEAN, text: 'is tournament finished?' },
          { opcode: 'isGroupStageFinished', blockType: Scratch.BlockType.BOOLEAN, text: 'is group stage finished?' },
          { opcode: 'isOnHotStreak', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 on hot streak?' },
          { opcode: 'isStreakActive', blockType: Scratch.BlockType.BOOLEAN, text: 'is CR7 streak active?' },
          '---',
          // REPORTER BLOCKS - super easy values
          { opcode: 'aiRonaldoReply', blockType: Scratch.BlockType.REPORTER, text: '🤖 AI CR7 replies to [MESSAGE]', arguments: { MESSAGE: {type: Scratch.ArgumentType.STRING, defaultValue: 'How do I become great?'} }},
          { opcode: 'cr7PlayerSpeed', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Player Speed [BASE]', arguments: { BASE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 8} }},
          { opcode: 'cr7ShotPower', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Shot Power [BASE]', arguments: { BASE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 50} }},
          { opcode: 'cr7MatchRating', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Match Rating' },
          { opcode: 'cr7CareerGoals', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Career Goals' },
          { opcode: 'cr7PenaltySuccessRate', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Penalty Success %' },
          { opcode: 'cr7TeamMorale', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Team Morale' },
          { opcode: 'cr7RandomJerseyNumber', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Random Jersey Number' },
          { opcode: 'cr7TotalSiuuusThisGame', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Total Siuuus this game' },
          { opcode: 'cr7SeasonGoals', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Season Goals' },
          { opcode: 'cr7HeadersScored', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Headers Scored' },
          { opcode: 'cr7FreeKicksScored', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Free Kicks Scored' },
          { opcode: 'cr7MatchesPlayed', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Matches Played' },
          { opcode: 'cr7GoalStreak', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Current Goal Streak' },
          { opcode: 'cr7LongestStreak', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Longest Streak Ever' },
          { opcode: 'cr7XPLevel', blockType: Scratch.BlockType.REPORTER, text: 'CR7 XP Level' },
          { opcode: 'cr7TotalXP', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Total XP' },
          { opcode: 'cr7MessiRoast', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Messi Roast level [LEVEL]', arguments: { LEVEL: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1} }},
          { opcode: 'cr7RandomLuckyNumber', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Random Lucky Number between [MIN] [MAX]', arguments: { MIN: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1}, MAX: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100} }},
          { opcode: 'cr7AddNumbers', blockType: Scratch.BlockType.REPORTER, text: 'CR7 add [A] + [B]', arguments: { A: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}, B: {type: Scratch.ArgumentType.NUMBER, defaultValue: 20} }},
          { opcode: 'cr7SubtractNumbers', blockType: Scratch.BlockType.REPORTER, text: 'CR7 subtract [A] - [B]', arguments: { A: {type: Scratch.ArgumentType.NUMBER, defaultValue: 50}, B: {type: Scratch.ArgumentType.NUMBER, defaultValue: 20} }},
          { opcode: 'cr7MultiplyNumbers', blockType: Scratch.BlockType.REPORTER, text: 'CR7 multiply [A] × [B]', arguments: { A: {type: Scratch.ArgumentType.NUMBER, defaultValue: 5}, B: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10} }},
          { opcode: 'cr7DivideNumbers', blockType: Scratch.BlockType.REPORTER, text: 'CR7 divide [A] ÷ [B]', arguments: { A: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100}, B: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10} }},
          { opcode: 'cr7Clamp', blockType: Scratch.BlockType.REPORTER, text: 'CR7 clamp [VALUE] between [MIN] and [MAX]', arguments: { VALUE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 50}, MIN: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, MAX: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100} }},
          { opcode: 'cr7Lerp', blockType: Scratch.BlockType.REPORTER, text: 'CR7 smooth move from [A] to [B] by [T]', arguments: { A: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, B: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100}, T: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5} }},
          { opcode: 'cr7CurrentDirection', blockType: Scratch.BlockType.REPORTER, text: 'CR7 current direction' },
          { opcode: 'cr7LuckyColor', blockType: Scratch.BlockType.REPORTER, text: 'CR7 lucky color' },
          { opcode: 'cr7SimpleTimerSeconds', blockType: Scratch.BlockType.REPORTER, text: 'CR7 simple timer seconds' },
          { opcode: 'getRonaldoCardInfo', blockType: Scratch.BlockType.REPORTER, text: 'Ronaldo card info for [CARD]', arguments: { CARD: {type: Scratch.ArgumentType.STRING, defaultValue: 'CR7 Legend'} }},
          { opcode: 'randomRonaldoCard', blockType: Scratch.BlockType.REPORTER, text: 'random Ronaldo card' },
          { opcode: 'ronaldoCardGoalPower', blockType: Scratch.BlockType.REPORTER, text: 'Ronaldo card goal power of [CARD]', arguments: { CARD: {type: Scratch.ArgumentType.STRING, defaultValue: 'CR7 Legend'} }},
          { opcode: 'ronaldoCardSpeed', blockType: Scratch.BlockType.REPORTER, text: 'Ronaldo card speed of [CARD]', arguments: { CARD: {type: Scratch.ArgumentType.STRING, defaultValue: 'CR7 Legend'} }},
          { opcode: 'ronaldoCardSiuuuEnergy', blockType: Scratch.BlockType.REPORTER, text: 'Ronaldo card Siuuu energy of [CARD]', arguments: { CARD: {type: Scratch.ArgumentType.STRING, defaultValue: 'CR7 Legend'} }},
          { opcode: 'battleResult', blockType: Scratch.BlockType.REPORTER, text: 'card battle result' },
          { opcode: 'cardBattleWinner', blockType: Scratch.BlockType.REPORTER, text: 'card battle winner' },
          { opcode: 'tournamentCurrentRound', blockType: Scratch.BlockType.REPORTER, text: 'tournament current round' },
          { opcode: 'tournamentWinner', blockType: Scratch.BlockType.REPORTER, text: 'tournament winner' },
          { opcode: 'tournamentRemainingCards', blockType: Scratch.BlockType.REPORTER, text: 'tournament remaining cards' },
          { opcode: 'tournamentPrizeMoney', blockType: Scratch.BlockType.REPORTER, text: 'tournament prize money' },
          { opcode: 'tournamentLiveStandings', blockType: Scratch.BlockType.REPORTER, text: 'tournament live standings' },
          { opcode: 'currentGroupStage', blockType: Scratch.BlockType.REPORTER, text: 'current group stage' },
          { opcode: 'currentStreakLength', blockType: Scratch.BlockType.REPORTER, text: 'CR7 current streak length' },
          { opcode: 'longestStreakEver', blockType: Scratch.BlockType.REPORTER, text: 'CR7 longest streak ever' },
          { opcode: 'streakBonus', blockType: Scratch.BlockType.REPORTER, text: 'CR7 streak bonus' },
          { opcode: 'clamp', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Clamp [VALUE] min [MIN] max [MAX]', arguments: { VALUE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 50}, MIN: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, MAX: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100} }},
          { opcode: 'lerp', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Smooth Move [A] to [B] by [T]', arguments: { A: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, B: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100}, T: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5} }},
          { opcode: 'distance', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Distance x1 [X1] y1 [Y1] to x2 [X2] y2 [Y2]', arguments: { X1: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, Y1: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, X2: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100}, Y2: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100} }},
          { opcode: 'currentTime', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Current Time (ms)' },
          { opcode: 'getDeltaTime', blockType: Scratch.BlockType.REPORTER, text: 'CR7 Delta Time (seconds)' },
          { opcode: 'siuuu', blockType: Scratch.BlockType.REPORTER, text: 'SIIUUU!!! 🐐' }
        ]
      };
    }

    whenCR7Scores() { this._goalsThisMatch = this._goalsThisMatch + 1; this._totalSiuuus = this._totalSiuuus + 1; this._goalStreak = this._goalStreak + 1; if (this._goalStreak > this._longestStreak) this._longestStreak = this._goalStreak; }
    whenMatchEnds() { this._matchEnded = true; this._matchesPlayed = this._matchesPlayed + 1; if (this._goalsThisMatch > 0) { this._legendUnlocked = true; } }
    whenStaminaRunsOut() { this._stamina = 0; }
    whenBicycleKickLands() { this._goalsThisMatch = this._goalsThisMatch + 1; }
    whenPenaltyIsTaken() {}
    whenLegendStatusUnlocked() {}
    whenTeamMoraleMax() { this._teamMorale = 100; }
    whenPlayerInjured() { this._isInjured = true; }
    whenFreeKickScored() { this._freeKicksScored = this._freeKicksScored + 1; this._goalsThisMatch = this._goalsThisMatch + 1; }
    whenHeaderScored() { this._headersScored = this._headersScored + 1; this._goalsThisMatch = this._goalsThisMatch + 1; }
    whenSprintUsed() { this._sprintsUsed = this._sprintsUsed + 1; this._stamina = this._stamina - 15; }
    whenGoalStreakReached() {}
    whenMatchWon() { this._teamMorale = this._teamMorale + 10; }
    whenMessiMentioned() {}
    whenCR7TouchesGround() {}
    whenCR7TouchesWall() {}
    whenCR7GetsPowerUp() {}
    whenTimerReachesZero() {}
    whenRonaldoCardDrawn() {}
    whenRonaldoCardPlayed() {}
    whenCardBattleStarts() { this._battleActive = true; }
    whenCardBattleWon() { this._battleActive = false; this._battleWinner = 'CR7'; }
    whenCardBattleLost() { this._battleActive = false; this._battleWinner = 'Opponent'; }
    whenTournamentRoundStarts() {}
    whenTournamentSemiFinal() {}
    whenTournamentFinal() {}
    whenTournamentEnds() { this._tournamentActive = false; }
    whenGroupStageEnds() { this._groupStageActive = false; }
    whenKnockoutStarts() {}
    whenStreakOf5Reached() {}
    whenHotStreakStarts() {}
    whenStreakOf10Reached() {}

    resetStamina() { this._stamina = 100; }
    triggerCelebration() {}
    trainSkill(args) { this._totalXP = this._totalXP + Scratch.Cast.toNumber(args.XP); if (this._totalXP > 500) { this._xpLevel = this._xpLevel + 1; } }
    updateScore(args) {}
    awardGoldenBoot() {}
    resetFullMatch() { this._goalsThisMatch = 0; this._stamina = 100; this._matchEnded = false; this._totalSiuuus = 0; this._goalStreak = 0; }
    triggerPenalty() {}
    boostTeamMorale(args) { this._teamMorale = Math.min(100, this._teamMorale + Scratch.Cast.toNumber(args.AMOUNT)); }
    healPlayer() { this._isInjured = false; this._stamina = 100; }
    playSiuuuSound() {}
    increaseCareerGoals(args) { this._careerGoals = this._careerGoals + Scratch.Cast.toNumber(args.AMOUNT); }
    decreaseTeamMorale(args) { this._teamMorale = Math.max(0, this._teamMorale - Scratch.Cast.toNumber(args.AMOUNT)); }
    setJerseyNumber(args) { this._jerseyNumber = Scratch.Cast.toNumber(args.NUMBER); }
    triggerMessiRoast() {}
    cr7MoveForward(args) {}
    cr7Jump(args) {}
    cr7TurnLeft(args) {}
    cr7TurnRight(args) {}
    cr7StopMoving() {}
    cr7RandomLuckyNumber(args) {}
    addToList(args) {}
    removeFromList(args) {}
    cr7SayHello() {}
    cr7ChangeColor(args) {}
    cr7GrowBigger(args) {}
    cr7ShrinkSmaller(args) {}
    cr7SetScore(args) {}
    cr7PlayGoalSound() {}
    createRonaldoCard(args) {}
    playRonaldoCard(args) {}
    startCardBattle(args) { this._battleActive = true; this._battleWinner = ''; }
    attackWithCard(args) { if (Math.random() > 0.4) { this._battleWinner = 'CR7'; } else { this._battleWinner = 'Opponent'; } }
    defendWithCard(args) { if (Math.random() > 0.5) { this._battleWinner = 'CR7'; } else { this._battleWinner = 'Opponent'; } }
    startTournament(args) { this._tournamentActive = true; this._tournamentRound = 1; this._tournamentCards = []; this._tournamentWinner = ''; this._prizeMoney = 0; }
    addCardToBracket(args) { this._tournamentCards.push(Scratch.Cast.toString(args.CARD)); }
    simulateNextRound() { 
      if (this._tournamentCards.length > 1) {
        this._tournamentRound = this._tournamentRound + 1;
        if (this._tournamentCards.length === 2) {
          this._tournamentWinner = this._tournamentCards[Math.floor(Math.random() * 2)];
          this._tournamentActive = false;
        } else {
          this._tournamentCards = this._tournamentCards.slice(0, Math.ceil(this._tournamentCards.length / 2));
        }
      }
    }
    startGroupStage() { this._groupStageActive = true; this._groups = [[],[],[],[]]; }
    addCardToGroup(args) { const g = Math.max(0, Math.min(3, Scratch.Cast.toNumber(args.GROUP) - 1)); this._groups[g].push(Scratch.Cast.toString(args.CARD)); }
    simulateGroupStage() { this._groupStageActive = false; }
    givePrizeMoney(args) { this._prizeMoney = Scratch.Cast.toNumber(args.AMOUNT); }
    increaseStreak(args) { 
      const amount = Scratch.Cast.toNumber(args.AMOUNT);
      this._goalStreak = this._goalStreak + amount;
      if (this._goalStreak > this._longestStreak) this._longestStreak = this._goalStreak;
      if (this._goalStreak >= 5) this._currentStreakBonus = 50;
    }
    resetStreak() { this._goalStreak = 0; this._currentStreakBonus = 0; }
    giveStreakBonus(args) { this._totalXP = this._totalXP + Scratch.Cast.toNumber(args.BONUS); }
    cr7DoubleTheNumber(args) { return Scratch.Cast.toNumber(args.NUMBER) * 2; }
    cr7HalveTheNumber(args) { return Scratch.Cast.toNumber(args.NUMBER) / 2; }

    isStaminaLow() { return this._stamina < 30; }
    hasHatTrick() { return this._goalsThisMatch >= 3; }
    isLegendaryForm() { return this._stamina > 80 && this._goalsThisMatch >= 2; }
    canDoBicycleKick() { return this._stamina > 60 && !this._isInjured; }
    isFreeKickInRange() { return true; }
    isLegendUnlocked() { return this._legendUnlocked; }
    isPlayerInjured() { return this._isInjured; }
    isPenaltyPerfect() { return Math.random() > 0.15; }
    hasEnoughStaminaForSprint() { return this._stamina >= 25; }
    isBallInGoalArea() { return true; }
    hasGoalStreak() { return this._goalStreak >= 3; }
    isMatchWon() { return this._goalsThisMatch > 0 && !this._matchEnded; }
    isMessiBetter() { return false; }
    isCR7TouchingGround() { return true; }
    isCR7TouchingWall() { return false; }
    isListEmpty(args) { return Scratch.Cast.toString(args.LIST).trim() === ''; }
    isCR7Moving() { return true; }
    isScoreHigh() { return this._goalsThisMatch > 2; }
    isTimeUp() { return false; }
    isRonaldoCardLegendary(args) { return true; }
    isCardBattleWon() { return this._battleWinner === 'CR7'; }
    isTournamentFinished() { return !this._tournamentActive; }
    isGroupStageFinished() { return !this._groupStageActive; }
    isOnHotStreak() { return this._goalStreak >= 5; }
    isStreakActive() { return this._goalStreak > 0; }

    aiRonaldoReply(args) {
      const msg = Scratch.Cast.toString(args.MESSAGE).toLowerCase();
      if (msg.includes('siuuu')) return this.randomFromArray(this.aiResponses.siuuu);
      if (msg.includes('goal')) return this.randomFromArray(this.aiResponses.goal);
      return this.randomFromArray(this.aiResponses.default);
    }
    cr7PlayerSpeed(args) { return Scratch.Cast.toNumber(args.BASE) + 4; }
    cr7ShotPower(args) { return Scratch.Cast.toNumber(args.BASE) * 1.2; }
    cr7MatchRating() { return Math.min(100, 70 + this._goalsThisMatch * 10); }
    cr7CareerGoals() { return this._careerGoals; }
    cr7PenaltySuccessRate() { return 92; }
    cr7TeamMorale() { return this._teamMorale; }
    cr7RandomJerseyNumber() { return Math.floor(Math.random() * 99) + 7; }
    cr7TotalSiuuusThisGame() { return this._totalSiuuus; }
    cr7SeasonGoals() { return this._careerGoals + this._goalsThisMatch; }
    cr7HeadersScored() { return this._headersScored; }
    cr7FreeKicksScored() { return this._freeKicksScored; }
    cr7MatchesPlayed() { return this._matchesPlayed; }
    cr7GoalStreak() { return this._goalStreak; }
    cr7LongestStreak() { return this._longestStreak; }
    cr7XPLevel() { return this._xpLevel; }
    cr7TotalXP() { return this._totalXP; }
    cr7MessiRoast(args) {
      const level = Math.max(1, Math.min(9, Scratch.Cast.toNumber(args.LEVEL)));
      return this.messiRoastLines[Math.floor(Math.random() * level)];
    }
    cr7RandomLuckyNumber(args) { const min = Scratch.Cast.toNumber(args.MIN); const max = Scratch.Cast.toNumber(args.MAX); return Math.floor(Math.random() * (max - min + 1)) + min; }
    cr7AddNumbers(args) { return Scratch.Cast.toNumber(args.A) + Scratch.Cast.toNumber(args.B); }
    cr7SubtractNumbers(args) { return Scratch.Cast.toNumber(args.A) - Scratch.Cast.toNumber(args.B); }
    cr7MultiplyNumbers(args) { return Scratch.Cast.toNumber(args.A) * Scratch.Cast.toNumber(args.B); }
    cr7DivideNumbers(args) { const b = Scratch.Cast.toNumber(args.B); return b === 0 ? 0 : Scratch.Cast.toNumber(args.A) / b; }
    cr7Clamp(args) { let v = Scratch.Cast.toNumber(args.VALUE); const min = Scratch.Cast.toNumber(args.MIN); const max = Scratch.Cast.toNumber(args.MAX); return Math.max(min, Math.min(max, v)); }
    cr7Lerp(args) { const a = Scratch.Cast.toNumber(args.A); const b = Scratch.Cast.toNumber(args.B); const t = Scratch.Cast.toNumber(args.T); return a + (b - a) * t; }
    cr7CurrentDirection() { return 90; }
    cr7LuckyColor() { return 'gold'; }
    cr7SimpleTimerSeconds() { return Math.floor((Date.now() - this._timerStart) / 1000); }
    getRonaldoCardInfo(args) { return Scratch.Cast.toString(args.CARD) + ' - Goal Power: 95, Speed: 90, Siuuu Energy: MAX!'; }
    randomRonaldoCard() { const cards = ['CR7 Legend', 'Siuuu King', 'Header Hero', 'Free Kick GOAT']; return cards[Math.floor(Math.random() * cards.length)]; }
    ronaldoCardGoalPower(args) { return 95; }
    ronaldoCardSpeed(args) { return 90; }
    ronaldoCardSiuuuEnergy(args) { return 'MAX'; }
    battleResult() { return this._battleWinner === 'CR7' ? 'CR7 WINS!' : 'Opponent wins...'; }
    cardBattleWinner() { return this._battleWinner; }
    tournamentCurrentRound() { return this._tournamentRound; }
    tournamentWinner() { return this._tournamentWinner; }
    tournamentRemainingCards() { return this._tournamentCards.join(', '); }
    tournamentPrizeMoney() { return this._prizeMoney; }
    tournamentLiveStandings() { return 'Group 1: CR7 Legend - Group 2: Siuuu King'; }
    currentGroupStage() { return this._groupStageActive ? 'Active' : 'Finished'; }
    currentStreakLength() { return this._goalStreak; }
    longestStreakEver() { return this._longestStreak; }
    streakBonus() { return this._currentStreakBonus; }
    clamp(args) { let v = Scratch.Cast.toNumber(args.VALUE); const min = Scratch.Cast.toNumber(args.MIN); const max = Scratch.Cast.toNumber(args.MAX); return Math.max(min, Math.min(max, v)); }
    lerp(args) { const a = Scratch.Cast.toNumber(args.A); const b = Scratch.Cast.toNumber(args.B); const t = Scratch.Cast.toNumber(args.T); return a + (b - a) * t; }
    distance(args) { const x1 = Scratch.Cast.toNumber(args.X1); const y1 = Scratch.Cast.toNumber(args.Y1); const x2 = Scratch.Cast.toNumber(args.X2); const y2 = Scratch.Cast.toNumber(args.Y2); return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)); }
    currentTime() { return Date.now(); }
    getDeltaTime() { return this._deltaTime; }
    randomFromArray(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    siuuu() { return 'SIIUUU!!! 🐐⚽'; }
  }

  Scratch.extensions.register(new RonaldoMaker());
})(Scratch);
