import { Manager } from './Manager'
import * as Stats from "stats-js";

class StatisticManager implements Manager {

    private static initialized = false;
    private static statisticHandler: Stats;

    constructor() {
        if (StatisticManager.initialized) {
            return;
        }
        
        StatisticManager.statisticHandler = new Stats();
        document.body.appendChild(StatisticManager.statisticHandler.dom);
        StatisticManager.hideStats();
        StatisticManager.initialized = true;
    }

    public static showStats() {
        StatisticManager.statisticHandler.showPanel(0);
    }

    public static hideStats() {
        StatisticManager.statisticHandler.showPanel(3);
    }

    public static beginMonitoring() {
        StatisticManager.statisticHandler.begin();
    }

    public static endMonitoring() {
        StatisticManager.statisticHandler.end();
    }
}

export { StatisticManager };