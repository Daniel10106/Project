//mouseEvents for orbiting
//mouseup, mousedown, mousemove

var drag = false;
		
		// при натискане на бутон
		function mouseDown(event)
		{
			gl.canvas.style.cursor = 'move';
			startX = getX(event);
			startY = getY(event);
			drag = true;
		}
		
		// при пускане на бутон (все едно кой)
		function mouseUp(event)
		{
			gl.canvas.style.cursor = 'default';
			drag = false;
		}
		
		// при движение на мишката
		function mouseMove(event)
		{
			mouseX = getX(event)+Math.round(gl.canvas.width/2);
			mouseY = getY(event)+Math.round(gl.canvas.height/2);

			// игнорираме движение, ако не влачим
			if (!drag) return;

			var dX = startX-getX(event);
			var dY = startY-getY(event);
			
			if (event.buttons==1)
			{
				// ляв бутон - въртене с ограничение
				viewA += dX/100;
				viewB += dY/100;
				if (viewB>1.57) viewB=1.57;
				if (viewB<-1.57) viewB=-1.57;
			}
			else
			{
				// десен бутон - мащабиране с ограничение
				gl.canvas.style.cursor = 'n-resize';
				viewD *= Math.pow(1.01,dY);
				if (viewD>40) viewD=40;
				if (viewD<10) viewD=10;
			}
			
			startX = getX(event);
			startY = getY(event);
		}
