package com.webcrawler.controller

import com.webcrawler.model.LiveGridDTO
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationListener
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageSendingOperations
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller
import org.springframework.web.socket.messaging.SessionDisconnectEvent
import java.security.Principal
import java.time.format.DateTimeFormatter
import kotlin.math.roundToInt

@Controller
class GridController @Autowired constructor(private val messagingTemplate: SimpMessageSendingOperations) : ApplicationListener<SessionDisconnectEvent> {
    @MessageMapping("/topic/activity")
    @SendTo("/topic/tracker")
    fun onMessageMapping(@Payload liveGridDTO: LiveGridDTO): List<LiveGridDTO> {
        val activityDTOs = ArrayList<LiveGridDTO>()
        for (x in 0..100) {
            val activityDTO = LiveGridDTO()
            activityDTO.c1 = "time"
            activityDTO.c2 = (Math.random() * 100).toString()
            activityDTO.c3 = (Math.random() * 100).toString()
            activityDTO.c4 = (Math.random() * 10).roundToInt() % 2 == 0

            activityDTOs.add(activityDTO)
        }
        return activityDTOs
    }

    override fun onApplicationEvent(event: SessionDisconnectEvent) {
        val activityDTOs = ArrayList<LiveGridDTO>()
        for (x in 0..100) {
            val activityDTO = LiveGridDTO()
            activityDTO.c1 = "time"
            activityDTO.c2 = (Math.random() * 100).toString()
            activityDTO.c3 = (Math.random() * 100).toString()
            activityDTO.c4 = (Math.random() * 10).roundToInt() % 2 == 0

            activityDTOs.add(activityDTO)
        }
        messagingTemplate.convertAndSend("/topic/tracker", activityDTOs)
    }

    companion object {
        val TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm:ss:SSS")
        val log = LoggerFactory.getLogger(GridController::class.java)
    }
}
