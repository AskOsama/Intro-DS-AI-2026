"""
Generate accurate gradient descent animation GIF for ML education.
This demonstrates REAL gradient descent, not artificial parameter increment.
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib.animation import PillowWriter

def generate_gradient_descent_gif():
    """Generate an accurate gradient descent animation for linear regression."""

    # Training data: y = 2x + 1 with some noise
    np.random.seed(42)
    X = np.array([1, 2, 3, 4, 5], dtype=float)
    Y_true = 2 * X + 1  # True function
    Y = Y_true + np.random.normal(0, 0.3, len(X))  # Add slight noise for realism

    # Initial parameters (starting from 0)
    m, c = 0.0, 0.0
    learning_rate = 0.01  # Slower learning rate for educational visualization
    n_iterations = 80     # More iterations to show gradual convergence

    # Store history for animation
    history = []

    for i in range(n_iterations):
        # Forward pass: predict Y
        Y_pred = m * X + c

        # Calculate MSE loss
        loss = np.mean((Y - Y_pred) ** 2)

        # Calculate gradients (derivatives of MSE w.r.t. m and c)
        # MSE = (1/n) * sum((Y - (mX + c))^2)
        # dMSE/dm = -(2/n) * sum(X * (Y - (mX + c)))
        # dMSE/dc = -(2/n) * sum(Y - (mX + c))
        dm = -2 * np.mean(X * (Y - Y_pred))
        dc = -2 * np.mean(Y - Y_pred)

        # Update parameters using gradient descent
        m = m - learning_rate * dm
        c = c - learning_rate * dc

        history.append({
            'm': m,
            'c': c,
            'loss': loss,
            'dm': dm,
            'dc': dc
        })

    # Create the animation
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    fig.suptitle('Gradient Descent: Learning y = mx + c', fontsize=14, fontweight='bold')

    # Left plot: Line fitting
    ax1.scatter(X, Y, color='#3498db', s=100, label='Training Data', zorder=5)
    line, = ax1.plot([], [], 'r-', linewidth=2, label='Model Prediction')
    ax1.set_xlim(0, 6)
    ax1.set_ylim(0, 14)
    ax1.set_xlabel('X', fontsize=12)
    ax1.set_ylabel('Y', fontsize=12)
    ax1.set_title('Line Fitting')
    ax1.legend(loc='upper left')
    ax1.grid(True, alpha=0.3)

    # Add parameter text
    param_text = ax1.text(0.5, 12, '', fontsize=11,
                          bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

    # Right plot: Loss curve
    losses = [h['loss'] for h in history]
    ax2.set_xlim(0, n_iterations)
    ax2.set_ylim(0, max(losses) * 1.1)
    loss_line, = ax2.plot([], [], 'g-', linewidth=2)
    loss_point, = ax2.plot([], [], 'go', markersize=8)
    ax2.set_xlabel('Iteration', fontsize=12)
    ax2.set_ylabel('MSE Loss', fontsize=12)
    ax2.set_title('Loss Convergence')
    ax2.grid(True, alpha=0.3)

    # Add loss text
    loss_text = ax2.text(n_iterations * 0.6, max(losses) * 0.8, '', fontsize=11,
                         bbox=dict(boxstyle='round', facecolor='lightgreen', alpha=0.8))

    plt.tight_layout()

    def init():
        line.set_data([], [])
        loss_line.set_data([], [])
        loss_point.set_data([], [])
        param_text.set_text('')
        loss_text.set_text('')
        return line, loss_line, loss_point, param_text, loss_text

    def animate(frame):
        if frame < len(history):
            h = history[frame]

            # Update line fitting
            X_plot = np.linspace(0, 6, 100)
            Y_plot = h['m'] * X_plot + h['c']
            line.set_data(X_plot, Y_plot)

            # Update parameter text
            param_text.set_text(f"Iteration: {frame + 1}\nm = {h['m']:.3f}\nc = {h['c']:.3f}")

            # Update loss curve
            loss_line.set_data(range(frame + 1), [history[i]['loss'] for i in range(frame + 1)])
            loss_point.set_data([frame], [h['loss']])

            # Update loss text
            loss_text.set_text(f"MSE: {h['loss']:.4f}")

        return line, loss_line, loss_point, param_text, loss_text

    # Create animation
    ani = animation.FuncAnimation(
        fig, animate, init_func=init,
        frames=n_iterations + 15,  # Extra frames to pause at end
        interval=120,  # 120ms between frames (slightly slower for clarity)
        blit=True
    )

    # Save as GIF
    writer = PillowWriter(fps=10)
    ani.save('gradient_descent_linear.gif', writer=writer, dpi=100)
    print("Saved: gradient_descent_linear.gif")

    plt.close()

    # Print final results
    final = history[-1]
    print(f"\nFinal Parameters after {n_iterations} iterations:")
    print(f"  m = {final['m']:.4f} (target: 2.0)")
    print(f"  c = {final['c']:.4f} (target: 1.0)")
    print(f"  MSE = {final['loss']:.6f}")

if __name__ == "__main__":
    generate_gradient_descent_gif()
